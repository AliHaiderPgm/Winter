import { useEffect, useState } from "react"
import { Alert, Button, Card, Form, Input, Modal, Progress, Tag } from "antd"
import { CameraOutlined, CheckCircleFilled, DeleteOutlined, EditOutlined, IdcardOutlined, KeyOutlined, MailOutlined, PhoneOutlined, ReloadOutlined, SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons"
import AuthServices from "../../context/AuthServices"
import { useAuth } from "../../context/AuthContext"
import { toast } from "../../utils/toast"

const phoneNumberRule = {
    validator(_, value) {
        if (!value) return Promise.resolve()

        const normalized = value.replace(/[\s()-]/g, "")
        if (/^(?:\+?[1-9]\d{7,14}|0\d{9,14})$/.test(normalized)) return Promise.resolve()

        return Promise.reject(new Error("Please enter a valid phone number"))
    },
}

const Profile = () => {
    const { user, dispatch } = useAuth()
    const [form] = Form.useForm()
    const [passwordForm] = Form.useForm()
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadStatus, setUploadStatus] = useState("idle")
    const [retryFile, setRetryFile] = useState(null)
    const [avatarHover, setAvatarHover] = useState(false)
    const [error, setError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [passwordSaving, setPasswordSaving] = useState(false)
    const [passwordEditing, setPasswordEditing] = useState(false)

    useEffect(() => {
        if (editing) {
            const nameParts = user?.name?.trim()?.split(/\s+/) || []
            form.setFieldsValue({
                firstName: nameParts[0] || "",
                email: user?.email,
                secondName: user?.secondName || nameParts.slice(1).join(" "),
                phoneNumber: user?.phoneNumber,
            })
        }
    }, [editing, form, user])

    useEffect(() => {
        if (uploadStatus !== "success") return undefined

        const timeout = window.setTimeout(() => setUploadStatus("idle"), 1000)
        return () => window.clearTimeout(timeout)
    }, [uploadStatus])

    const handleSubmit = async (values) => {
        try {
            setSaving(true)
            setError("")
            const updatedUser = await AuthServices.updateMe({
                name: values.firstName,
                email: values.email,
                secondName: values.secondName,
                phoneNumber: values.phoneNumber,
            })
            dispatch({ type: "LOGIN", payload: { user: updatedUser } })
            setEditing(false)
            toast.success("Profile updated successfully")
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to update your profile")
        } finally {
            setSaving(false)
        }
    }

    const handleCancel = () => {
        form.resetFields()
        setError("")
        setEditing(false)
    }

    const handlePasswordSubmit = async (values) => {
        try {
            setPasswordSaving(true)
            setPasswordError("")
            await AuthServices.updatePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            })
            passwordForm.resetFields()
            setPasswordEditing(false)
            toast.success("Password updated successfully")
        } catch (requestError) {
            setPasswordError(requestError.response?.data?.message || "Unable to update your password")
        } finally {
            setPasswordSaving(false)
        }
    }

    const handlePasswordCancel = () => {
        passwordForm.resetFields()
        setPasswordError("")
        setPasswordEditing(false)
    }

    const updateProfileImage = async (profileImage) => {
        const updatedUser = await AuthServices.updateMe({
            name: user.name,
            email: user.email,
            profileImage,
        })
        dispatch({ type: "LOGIN", payload: { user: updatedUser } })
    }

    const uploadImageFile = (file) => {
        const reader = new FileReader()
        reader.onload = async () => {
            try {
                setImageLoading(true)
                setError("")
                setUploadStatus("uploading")
                setUploadProgress(0)
                const { url } = await AuthServices.uploadProfileImage(
                    reader.result,
                    (progressEvent) => {
                        if (progressEvent.total) {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                            setUploadProgress(Math.min(progress, 99))
                        }
                    }
                )
                await updateProfileImage(url)
                setUploadProgress(100)
                setUploadStatus("success")
                toast.success("Profile image updated")
            } catch (requestError) {
                setUploadStatus("error")
                setError(requestError.response?.data?.message || "Unable to upload your profile image")
            } finally {
                setImageLoading(false)
            }
        }
        reader.onerror = () => {
            setUploadStatus("error")
            setImageLoading(false)
            setError("Unable to read this image")
        }
        reader.readAsDataURL(file)
    }

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0]
        event.target.value = ""
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setUploadStatus("error")
            setError("Please choose an image file")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setUploadStatus("error")
            setError("Profile images must be smaller than 5MB")
            return
        }

        setRetryFile(file)
        uploadImageFile(file)
    }

    const handleRetryUpload = () => {
        if (retryFile) uploadImageFile(retryFile)
    }

    const clearProfileImage = async () => {
        try {
            setImageLoading(true)
            setError("")
            await updateProfileImage(null)
            toast.success("Profile image removed")
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to remove your profile image")
        } finally {
            setImageLoading(false)
        }
    }

    const handleImageClear = () => {
        Modal.confirm({
            title: "Remove profile image?",
            content: "Your avatar will be replaced with your initials.",
            okText: "Remove",
            okButtonProps: { danger: true },
            cancelText: "Cancel",
            onOk: clearProfileImage,
        })
    }

    const initials = user?.name?.trim()?.slice(0, 1)?.toUpperCase() || "U"

    return (
        <main className="container py-4 py-md-5">
            <div className="mb-4">
                <p className="text-muted text-uppercase small fw-semibold mb-2">Account</p>
                <h1 className="mb-2">Your profile</h1>
                <p className="text-muted mb-0">Manage your personal details and account preferences.</p>
            </div>

            <div className="row g-4">
                <div className="col-12 col-lg-4">
                    <Card className="h-100" bordered={false}>
                        <div className="d-flex flex-column align-items-center text-center py-3">
                            <div
                                className="position-relative"
                                onMouseEnter={() => setAvatarHover(true)}
                                onMouseLeave={() => setAvatarHover(false)}
                            >
                                {user?.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt={`${user?.name} profile`}
                                        className="rounded-circle object-fit-cover"
                                        style={{ width: 88, height: 88, padding: 4, backgroundColor: "#f1f3f5" }}
                                    />
                                ) : (
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-circle bg-black text-white fw-bold"
                                        style={{ width: 88, height: 88, fontSize: 32 }}
                                    >
                                        {initials}
                                    </div>
                                )}
                                {(avatarHover || imageLoading || uploadStatus === "success" || uploadStatus === "error") && (
                                    <div
                                        className="position-absolute top-0 start-0 rounded-circle d-flex align-items-center justify-content-center gap-2"
                                        style={{
                                            width: 88,
                                            height: 88,
                                            background: uploadStatus === "success" ? "transparent" : "rgba(0, 0, 0, 0.62)"
                                        }}
                                    >
                                        {uploadStatus === "uploading" ? (
                                            <Progress
                                                type="circle"
                                                percent={uploadProgress}
                                                size={58}
                                                strokeColor="#fff"
                                                trailColor="rgba(255,255,255,0.25)"
                                                format={(percent) => <span style={{ color: "#fff", fontSize: 13 }}>{percent}%</span>}
                                            />
                                        ) : uploadStatus === "success" ? (
                                            <CheckCircleFilled style={{ color: "#15803d", fontSize: 30 }} title="Upload complete" />
                                        ) : uploadStatus === "error" ? (
                                            <Button
                                                type="text"
                                                icon={<ReloadOutlined />}
                                                onClick={handleRetryUpload}
                                                disabled={!retryFile}
                                                title="Try upload again"
                                                style={{ color: "#fff", fontSize: 24 }}
                                            />
                                        ) : (
                                            <>
                                                <label className="text-white d-flex align-items-center justify-content-center" style={{ cursor: imageLoading ? "wait" : "pointer" }} title="Upload profile image">
                                                    <CameraOutlined style={{ fontSize: 22 }} />
                                                    <input type="file" accept="image/*" onChange={handleImageUpload} hidden disabled={imageLoading} />
                                                </label>
                                                {user?.profileImage && (
                                                    <Button
                                                        type="text"
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        onClick={handleImageClear}
                                                        loading={imageLoading}
                                                        disabled={imageLoading}
                                                        title="Clear profile image"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            <h2 className="h4 mt-3 mb-1">{[user?.name, user?.secondName].filter(Boolean).join(" ")}</h2>
                            <p className="text-muted mb-3">{user?.email}</p>
                            {user?.type === "admin" && (
                                <Tag icon={<SafetyCertificateOutlined />} color="gold">
                                    Administrator
                                </Tag>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="col-12 col-lg-8">
                    <Card
                        title="Personal details"
                        bordered={false}
                        extra={(
                            <div className="d-flex align-items-center gap-1">
                                <Button type="text" icon={<EditOutlined />} onClick={() => setEditing(true)}>Edit</Button>
                                <Button type="text" icon={<KeyOutlined />} onClick={() => setPasswordEditing(true)}>Change password</Button>
                            </div>
                        )}
                    >
                        <div className="d-flex flex-column gap-3">
                            <div>
                                <p className="text-muted small mb-1">Full name</p>
                                <p className="mb-0 fw-semibold">{[user?.name, user?.secondName].filter(Boolean).join(" ")}</p>
                            </div>
                            <div>
                                <p className="text-muted small mb-1">Email address</p>
                                <p className="mb-0 fw-semibold">{user?.email}</p>
                            </div>
                        </div>
                    </Card>

                    <Modal
                        title="Edit personal details"
                        open={editing}
                        onCancel={handleCancel}
                        footer={null}
                        destroyOnClose
                    >
                        {error && <Alert className="mb-3" type="error" showIcon message={error} />}
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                            <div className="d-flex flex-column flex-lg-row gap-0 gap-lg-2">
                                <Form.Item
                                    name="firstName"
                                    label="First name"
                                    className="w-100"
                                    rules={[{ required: true, whitespace: true, message: "Please enter your first name" }]}
                                >
                                    <Input prefix={<UserOutlined />} size="large" />
                                </Form.Item>
                                <Form.Item name="secondName" label="Second name" className="w-100">
                                    <Input prefix={<IdcardOutlined />} size="large" />
                                </Form.Item>
                            </div>
                            <Form.Item
                                name="email"
                                label="Email address"
                                rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                            >
                                <Input prefix={<MailOutlined />} size="large" />
                            </Form.Item>
                            <Form.Item name="phoneNumber" label="Phone number" rules={[phoneNumberRule]}>
                                <Input prefix={<PhoneOutlined />} type="tel" inputMode="tel" size="large" />
                            </Form.Item>
                            <div className="d-flex gap-2 justify-content-end">
                                <Button size="large" style={{ minWidth: 128, height: 40, padding: "0 16px", lineHeight: 1, display: "inline-flex", alignItems: "center", justifyContent: "center" }} onClick={handleCancel}>Cancel</Button>
                                <Button size="large" style={{ minWidth: 128, height: 40, padding: "0 16px", lineHeight: 1, display: "inline-flex", alignItems: "center", justifyContent: "center" }} className="btn-filled" htmlType="submit" loading={saving}>Save changes</Button>
                            </div>
                        </Form>
                    </Modal>

                    <Modal
                        title="Update password"
                        open={passwordEditing}
                        onCancel={handlePasswordCancel}
                        footer={null}
                        destroyOnClose
                    >
                        {passwordError && <Alert className="mb-3" type="error" showIcon message={passwordError} />}
                        <Form form={passwordForm} layout="vertical" onFinish={handlePasswordSubmit}>
                            <Form.Item
                                name="currentPassword"
                                label="Current password"
                                rules={[{ required: true, message: "Please enter your current password" }]}
                            >
                                <Input.Password size="large" />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                label="New password"
                                dependencies={["currentPassword"]}
                                rules={[
                                    { required: true, message: "Please enter a new password" },
                                    { min: 6, message: "Password must be at least 6 characters" },
                                ]}
                            >
                                <Input.Password size="large" />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirm new password"
                                dependencies={["newPassword"]}
                                rules={[
                                    { required: true, message: "Please confirm your new password" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("newPassword") === value) return Promise.resolve()
                                            return Promise.reject(new Error("Passwords do not match"))
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password size="large" />
                            </Form.Item>
                            <div className="d-flex gap-2 justify-content-end">
                                <Button onClick={handlePasswordCancel}>Cancel</Button>
                                <Button className="btn-filled" htmlType="submit" loading={passwordSaving}>Update password</Button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>
        </main>
    )
}

export default Profile
