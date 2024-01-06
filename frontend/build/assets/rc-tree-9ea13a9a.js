import{d as Pe,e as R,h as Ke,f as te,b as w,g as B,i as je,j as We,a as qe,k as Y,_ as Ve,c as ee,o as Ye}from"./@babel-43e769cc.js";import{r as N}from"./react-52c5f799.js";import{b as z,B as dt,x as it,y as ze,a as Xe,K as oe}from"./rc-util-49c06749.js";import{c as G}from"./classnames-5da7e38f.js";import"./react-is-e8e5dbb3.js";import{L as st}from"./rc-virtual-list-40f33dd9.js";import{C as lt}from"./rc-motion-6c938c71.js";function Je(r,i){var p=new Set;return r.forEach(function(e){i.has(e)||p.add(e)}),p}function ct(r){var i=r||{},p=i.disabled,e=i.disableCheckbox,o=i.checkable;return!!(p||e)||o===!1}function ut(r,i,p,e){for(var o=new Set(r),l=new Set,g=0;g<=p;g+=1){var t=i.get(g)||new Set;t.forEach(function(s){var c=s.key,f=s.node,v=s.children,h=v===void 0?[]:v;o.has(c)&&!e(f)&&h.filter(function(y){return!e(y.node)}).forEach(function(y){o.add(y.key)})})}for(var n=new Set,a=p;a>=0;a-=1){var d=i.get(a)||new Set;d.forEach(function(s){var c=s.parent,f=s.node;if(!(e(f)||!s.parent||n.has(s.parent.key))){if(e(s.parent.node)){n.add(c.key);return}var v=!0,h=!1;(c.children||[]).filter(function(y){return!e(y.node)}).forEach(function(y){var u=y.key,K=o.has(u);v&&!K&&(v=!1),!h&&(K||l.has(u))&&(h=!0)}),v&&o.add(c.key),h&&l.add(c.key),n.add(c.key)}})}return{checkedKeys:Array.from(o),halfCheckedKeys:Array.from(Je(l,o))}}function ft(r,i,p,e,o){for(var l=new Set(r),g=new Set(i),t=0;t<=e;t+=1){var n=p.get(t)||new Set;n.forEach(function(c){var f=c.key,v=c.node,h=c.children,y=h===void 0?[]:h;!l.has(f)&&!g.has(f)&&!o(v)&&y.filter(function(u){return!o(u.node)}).forEach(function(u){l.delete(u.key)})})}g=new Set;for(var a=new Set,d=e;d>=0;d-=1){var s=p.get(d)||new Set;s.forEach(function(c){var f=c.parent,v=c.node;if(!(o(v)||!c.parent||a.has(c.parent.key))){if(o(c.parent.node)){a.add(f.key);return}var h=!0,y=!1;(f.children||[]).filter(function(u){return!o(u.node)}).forEach(function(u){var K=u.key,k=l.has(K);h&&!k&&(h=!1),!y&&(k||g.has(K))&&(y=!0)}),h||l.delete(f.key),y&&g.add(f.key),a.add(f.key)}})}return{checkedKeys:Array.from(l),halfCheckedKeys:Array.from(Je(g,l))}}function Ee(r,i,p,e){var o=[],l;e?l=e:l=ct;var g=new Set(r.filter(function(d){var s=!!p[d];return s||o.push(d),s})),t=new Map,n=0;Object.keys(p).forEach(function(d){var s=p[d],c=s.level,f=t.get(c);f||(f=new Set,t.set(c,f)),f.add(s),n=Math.max(n,c)}),z(!o.length,"Tree missing follow keys: ".concat(o.slice(0,100).map(function(d){return"'".concat(d,"'")}).join(", ")));var a;return i===!0?a=ut(g,t,n,l):a=ft(g,i.halfCheckedKeys,t,n,l),a}var pt=["children"];function Qe(r,i){return"".concat(r,"-").concat(i)}function vt(r){return r&&r.type&&r.type.isTreeNode}function pe(r,i){return r??i}function ye(r){var i=r||{},p=i.title,e=i._title,o=i.key,l=i.children,g=p||"title";return{title:g,_title:e||[g],key:o||"key",children:l||"children"}}function gt(r){function i(p){var e=dt(p);return e.map(function(o){if(!vt(o))return z(!o,"Tree/TreeNode can only accept TreeNode as children."),null;var l=o.key,g=o.props,t=g.children,n=Ke(g,pt),a=R({key:l},n),d=i(t);return d.length&&(a.children=d),a}).filter(function(o){return o})}return i(r)}function be(r,i,p){var e=ye(p),o=e._title,l=e.key,g=e.children,t=new Set(i===!0?[]:i),n=[];function a(d){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;return d.map(function(c,f){for(var v=Qe(s?s.pos:"0",f),h=pe(c[l],v),y,u=0;u<o.length;u+=1){var K=o[u];if(c[K]!==void 0){y=c[K];break}}var k=R(R({},it(c,[].concat(te(o),[l,g]))),{},{title:y,key:h,parent:s,pos:v,children:null,data:c,isStart:[].concat(te(s?s.isStart:[]),[f===0]),isEnd:[].concat(te(s?s.isEnd:[]),[f===d.length-1])});return n.push(k),i===!0||t.has(h)?k.children=a(c[g]||[],k):k.children=[],k})}return a(r),n}function ht(r,i,p){var e={};Pe(p)==="object"?e=p:e={externalGetKey:p},e=e||{};var o=e,l=o.childrenPropName,g=o.externalGetKey,t=o.fieldNames,n=ye(t),a=n.key,d=n.children,s=l||d,c;g?typeof g=="string"?c=function(h){return h[g]}:typeof g=="function"&&(c=function(h){return g(h)}):c=function(h,y){return pe(h[a],y)};function f(v,h,y,u){var K=v?v[s]:r,k=v?Qe(y.pos,h):"0",m=v?[].concat(te(u),[v]):[];if(v){var x=c(v,k),E={node:v,index:h,pos:k,key:x,parentPos:y.node?y.pos:null,level:y.level+1,nodes:m};i(E)}K&&K.forEach(function(D,b){f(D,b,{node:v,pos:k,level:y?y.level+1:-1},m)})}f(null)}function yt(r){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},p=i.initWrapper,e=i.processEntity,o=i.onProcessFinished,l=i.externalGetKey,g=i.childrenPropName,t=i.fieldNames,n=arguments.length>2?arguments[2]:void 0,a=l||n,d={},s={},c={posEntities:d,keyEntities:s};return p&&(c=p(c)||c),ht(r,function(f){var v=f.node,h=f.index,y=f.pos,u=f.key,K=f.parentPos,k=f.level,m=f.nodes,x={node:v,nodes:m,index:h,key:u,pos:y,level:k},E=pe(u,y);d[y]=x,s[E]=x,x.parent=d[K],x.parent&&(x.parent.children=x.parent.children||[],x.parent.children.push(x)),e&&e(x,c)},{externalGetKey:a,childrenPropName:g,fieldNames:t}),o&&o(c),c}function ue(r,i){var p=i.expandedKeys,e=i.selectedKeys,o=i.loadedKeys,l=i.loadingKeys,g=i.checkedKeys,t=i.halfCheckedKeys,n=i.dragOverNodeKey,a=i.dropPosition,d=i.keyEntities,s=d[r],c={eventKey:r,expanded:p.indexOf(r)!==-1,selected:e.indexOf(r)!==-1,loaded:o.indexOf(r)!==-1,loading:l.indexOf(r)!==-1,checked:g.indexOf(r)!==-1,halfChecked:t.indexOf(r)!==-1,pos:String(s?s.pos:""),dragOver:n===r&&a===0,dragOverGapTop:n===r&&a===-1,dragOverGapBottom:n===r&&a===1};return c}function M(r){var i=r.data,p=r.expanded,e=r.selected,o=r.checked,l=r.loaded,g=r.loading,t=r.halfChecked,n=r.dragOver,a=r.dragOverGapTop,d=r.dragOverGapBottom,s=r.pos,c=r.active,f=r.eventKey,v=R(R({},i),{},{expanded:p,selected:e,checked:o,loaded:l,loading:g,halfChecked:t,dragOver:n,dragOverGapTop:a,dragOverGapBottom:d,pos:s,active:c,key:f});return"props"in v||Object.defineProperty(v,"props",{get:function(){return z(!1,"Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`."),r}}),v}var Te=N.createContext(null),Kt=function(i){for(var p=i.prefixCls,e=i.level,o=i.isStart,l=i.isEnd,g="".concat(p,"-indent-unit"),t=[],n=0;n<e;n+=1){var a;t.push(N.createElement("span",{key:n,className:G(g,(a={},w(a,"".concat(g,"-start"),o[n]),w(a,"".concat(g,"-end"),l[n]),a))}))}return N.createElement("span",{"aria-hidden":"true",className:"".concat(p,"-indent")},t)};const kt=N.memo(Kt);var mt=["eventKey","className","style","dragOver","dragOverGapTop","dragOverGapBottom","isLeaf","isStart","isEnd","expanded","selected","checked","halfChecked","loading","domRef","active","data","onMouseMove","selectable"],Ie="open",Re="close",Nt="---",xt=function(r){je(p,r);var i=We(p);function p(){var e;qe(this,p);for(var o=arguments.length,l=new Array(o),g=0;g<o;g++)l[g]=arguments[g];return e=i.call.apply(i,[this].concat(l)),e.state={dragNodeHighlight:!1},e.selectHandle=void 0,e.cacheIndent=void 0,e.onSelectorClick=function(t){var n=e.props.context.onNodeClick;n(t,M(e.props)),e.isSelectable()?e.onSelect(t):e.onCheck(t)},e.onSelectorDoubleClick=function(t){var n=e.props.context.onNodeDoubleClick;n(t,M(e.props))},e.onSelect=function(t){if(!e.isDisabled()){var n=e.props.context.onNodeSelect;t.preventDefault(),n(t,M(e.props))}},e.onCheck=function(t){if(!e.isDisabled()){var n=e.props,a=n.disableCheckbox,d=n.checked,s=e.props.context.onNodeCheck;if(!(!e.isCheckable()||a)){t.preventDefault();var c=!d;s(t,M(e.props),c)}}},e.onMouseEnter=function(t){var n=e.props.context.onNodeMouseEnter;n(t,M(e.props))},e.onMouseLeave=function(t){var n=e.props.context.onNodeMouseLeave;n(t,M(e.props))},e.onContextMenu=function(t){var n=e.props.context.onNodeContextMenu;n(t,M(e.props))},e.onDragStart=function(t){var n=e.props.context.onNodeDragStart;t.stopPropagation(),e.setState({dragNodeHighlight:!0}),n(t,Y(e));try{t.dataTransfer.setData("text/plain","")}catch{}},e.onDragEnter=function(t){var n=e.props.context.onNodeDragEnter;t.preventDefault(),t.stopPropagation(),n(t,Y(e))},e.onDragOver=function(t){var n=e.props.context.onNodeDragOver;t.preventDefault(),t.stopPropagation(),n(t,Y(e))},e.onDragLeave=function(t){var n=e.props.context.onNodeDragLeave;t.stopPropagation(),n(t,Y(e))},e.onDragEnd=function(t){var n=e.props.context.onNodeDragEnd;t.stopPropagation(),e.setState({dragNodeHighlight:!1}),n(t,Y(e))},e.onDrop=function(t){var n=e.props.context.onNodeDrop;t.preventDefault(),t.stopPropagation(),e.setState({dragNodeHighlight:!1}),n(t,Y(e))},e.onExpand=function(t){var n=e.props,a=n.loading,d=n.context.onNodeExpand;a||d(t,M(e.props))},e.setSelectHandle=function(t){e.selectHandle=t},e.getNodeState=function(){var t=e.props.expanded;return e.isLeaf()?null:t?Ie:Re},e.hasChildren=function(){var t=e.props.eventKey,n=e.props.context.keyEntities,a=n[t]||{},d=a.children;return!!(d||[]).length},e.isLeaf=function(){var t=e.props,n=t.isLeaf,a=t.loaded,d=e.props.context.loadData,s=e.hasChildren();return n===!1?!1:n||!d&&!s||d&&a&&!s},e.isDisabled=function(){var t=e.props.disabled,n=e.props.context.disabled;return!!(n||t)},e.isCheckable=function(){var t=e.props.checkable,n=e.props.context.checkable;return!n||t===!1?!1:n},e.syncLoadData=function(t){var n=t.expanded,a=t.loading,d=t.loaded,s=e.props.context,c=s.loadData,f=s.onNodeLoad;a||c&&n&&!e.isLeaf()&&!e.hasChildren()&&!d&&f(M(e.props))},e.isDraggable=function(){var t=e.props,n=t.data,a=t.context.draggable;return!!(a&&(!a.nodeDraggable||a.nodeDraggable(n)))},e.renderDragHandler=function(){var t=e.props.context,n=t.draggable,a=t.prefixCls;return n!=null&&n.icon?N.createElement("span",{className:"".concat(a,"-draggable-icon")},n.icon):null},e.renderSwitcherIconDom=function(t){var n=e.props.switcherIcon,a=e.props.context.switcherIcon,d=n||a;return typeof d=="function"?d(R(R({},e.props),{},{isLeaf:t})):d},e.renderSwitcher=function(){var t=e.props.expanded,n=e.props.context.prefixCls;if(e.isLeaf()){var a=e.renderSwitcherIconDom(!0);return a!==!1?N.createElement("span",{className:G("".concat(n,"-switcher"),"".concat(n,"-switcher-noop"))},a):null}var d=G("".concat(n,"-switcher"),"".concat(n,"-switcher_").concat(t?Ie:Re)),s=e.renderSwitcherIconDom(!1);return s!==!1?N.createElement("span",{onClick:e.onExpand,className:d},s):null},e.renderCheckbox=function(){var t=e.props,n=t.checked,a=t.halfChecked,d=t.disableCheckbox,s=e.props.context.prefixCls,c=e.isDisabled(),f=e.isCheckable();if(!f)return null;var v=typeof f!="boolean"?f:null;return N.createElement("span",{className:G("".concat(s,"-checkbox"),n&&"".concat(s,"-checkbox-checked"),!n&&a&&"".concat(s,"-checkbox-indeterminate"),(c||d)&&"".concat(s,"-checkbox-disabled")),onClick:e.onCheck},v)},e.renderIcon=function(){var t=e.props.loading,n=e.props.context.prefixCls;return N.createElement("span",{className:G("".concat(n,"-iconEle"),"".concat(n,"-icon__").concat(e.getNodeState()||"docu"),t&&"".concat(n,"-icon_loading"))})},e.renderSelector=function(){var t=e.state.dragNodeHighlight,n=e.props,a=n.title,d=a===void 0?Nt:a,s=n.selected,c=n.icon,f=n.loading,v=n.data,h=e.props.context,y=h.prefixCls,u=h.showIcon,K=h.icon,k=h.loadData,m=h.titleRender,x=e.isDisabled(),E="".concat(y,"-node-content-wrapper"),D;if(u){var b=c||K;D=b?N.createElement("span",{className:G("".concat(y,"-iconEle"),"".concat(y,"-icon__customize"))},typeof b=="function"?b(e.props):b):e.renderIcon()}else k&&f&&(D=e.renderIcon());var C;typeof d=="function"?C=d(v):m?C=m(v):C=d;var S=N.createElement("span",{className:"".concat(y,"-title")},C);return N.createElement("span",{ref:e.setSelectHandle,title:typeof d=="string"?d:"",className:G("".concat(E),"".concat(E,"-").concat(e.getNodeState()||"normal"),!x&&(s||t)&&"".concat(y,"-node-selected")),onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,onContextMenu:e.onContextMenu,onClick:e.onSelectorClick,onDoubleClick:e.onSelectorDoubleClick},D,S,e.renderDropIndicator())},e.renderDropIndicator=function(){var t=e.props,n=t.disabled,a=t.eventKey,d=e.props.context,s=d.draggable,c=d.dropLevelOffset,f=d.dropPosition,v=d.prefixCls,h=d.indent,y=d.dropIndicatorRender,u=d.dragOverNodeKey,K=d.direction,k=!!s,m=!n&&k&&u===a,x=h??e.cacheIndent;return e.cacheIndent=h,m?y({dropPosition:f,dropLevelOffset:c,indent:x,prefixCls:v,direction:K}):null},e}return Ve(p,[{key:"componentDidMount",value:function(){this.syncLoadData(this.props)}},{key:"componentDidUpdate",value:function(){this.syncLoadData(this.props)}},{key:"isSelectable",value:function(){var o=this.props.selectable,l=this.props.context.selectable;return typeof o=="boolean"?o:l}},{key:"render",value:function(){var o,l=this.props,g=l.eventKey,t=l.className,n=l.style,a=l.dragOver,d=l.dragOverGapTop,s=l.dragOverGapBottom,c=l.isLeaf,f=l.isStart,v=l.isEnd,h=l.expanded,y=l.selected,u=l.checked,K=l.halfChecked,k=l.loading,m=l.domRef,x=l.active;l.data;var E=l.onMouseMove,D=l.selectable,b=Ke(l,mt),C=this.props.context,S=C.prefixCls,T=C.filterTreeNode,P=C.keyEntities,O=C.dropContainerKey,I=C.dropTargetKey,$=C.draggingNodeKey,A=this.isDisabled(),_=ze(b,{aria:!0,data:!0}),H=P[g]||{},de=H.level,ie=v[v.length-1],F=this.isDraggable(),U=!A&&F,X=$===g,se=D!==void 0?{"aria-selected":!!D}:void 0;return N.createElement("div",B({ref:m,className:G(t,"".concat(S,"-treenode"),(o={},w(o,"".concat(S,"-treenode-disabled"),A),w(o,"".concat(S,"-treenode-switcher-").concat(h?"open":"close"),!c),w(o,"".concat(S,"-treenode-checkbox-checked"),u),w(o,"".concat(S,"-treenode-checkbox-indeterminate"),K),w(o,"".concat(S,"-treenode-selected"),y),w(o,"".concat(S,"-treenode-loading"),k),w(o,"".concat(S,"-treenode-active"),x),w(o,"".concat(S,"-treenode-leaf-last"),ie),w(o,"".concat(S,"-treenode-draggable"),F),w(o,"dragging",X),w(o,"drop-target",I===g),w(o,"drop-container",O===g),w(o,"drag-over",!A&&a),w(o,"drag-over-gap-top",!A&&d),w(o,"drag-over-gap-bottom",!A&&s),w(o,"filter-node",T&&T(M(this.props))),o)),style:n,draggable:U,"aria-grabbed":X,onDragStart:U?this.onDragStart:void 0,onDragEnter:F?this.onDragEnter:void 0,onDragOver:F?this.onDragOver:void 0,onDragLeave:F?this.onDragLeave:void 0,onDrop:F?this.onDrop:void 0,onDragEnd:F?this.onDragEnd:void 0,onMouseMove:E},se,_),N.createElement(kt,{prefixCls:S,level:de,isStart:f,isEnd:v}),this.renderDragHandler(),this.renderSwitcher(),this.renderCheckbox(),this.renderSelector())}}]),p}(N.Component),fe=function(i){return N.createElement(Te.Consumer,null,function(p){return N.createElement(xt,B({},i,{context:p}))})};fe.displayName="TreeNode";fe.isTreeNode=1;function j(r,i){if(!r)return[];var p=r.slice(),e=p.indexOf(i);return e>=0&&p.splice(e,1),p}function V(r,i){var p=(r||[]).slice();return p.indexOf(i)===-1&&p.push(i),p}function Oe(r){return r.split("-")}function Ct(r,i){var p=[],e=i[r];function o(){var l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[];l.forEach(function(g){var t=g.key,n=g.children;p.push(t),o(n)})}return o(e.children),p}function Et(r){if(r.parent){var i=Oe(r.pos);return Number(i[i.length-1])===r.parent.children.length-1}return!1}function bt(r){var i=Oe(r.pos);return Number(i[i.length-1])===0}function $e(r,i,p,e,o,l,g,t,n,a){var d,s=r.clientX,c=r.clientY,f=r.target.getBoundingClientRect(),v=f.top,h=f.height,y=(a==="rtl"?-1:1)*(((o==null?void 0:o.x)||0)-s),u=(y-12)/e,K=t[p.props.eventKey];if(c<v+h/2){var k=g.findIndex(function($){return $.key===K.key}),m=k<=0?0:k-1,x=g[m].key;K=t[x]}var E=K.key,D=K,b=K.key,C=0,S=0;if(!n.includes(E))for(var T=0;T<u&&Et(K);T+=1)K=K.parent,S+=1;var P=i.props.data,O=K.node,I=!0;return bt(K)&&K.level===0&&c<v+h/2&&l({dragNode:P,dropNode:O,dropPosition:-1})&&K.key===p.props.eventKey?C=-1:(D.children||[]).length&&n.includes(b)?l({dragNode:P,dropNode:O,dropPosition:0})?C=0:I=!1:S===0?u>-1.5?l({dragNode:P,dropNode:O,dropPosition:1})?C=1:I=!1:l({dragNode:P,dropNode:O,dropPosition:0})?C=0:l({dragNode:P,dropNode:O,dropPosition:1})?C=1:I=!1:l({dragNode:P,dropNode:O,dropPosition:1})?C=1:I=!1,{dropPosition:C,dropLevelOffset:S,dropTargetKey:K.key,dropTargetPos:K.pos,dragOverNodeKey:b,dropContainerKey:C===0?null:((d=K.parent)===null||d===void 0?void 0:d.key)||null,dropAllowed:I}}function Ae(r,i){if(r){var p=i.multiple;return p?r.slice():r.length?[r[0]]:r}}function De(r){if(!r)return null;var i;if(Array.isArray(r))i={checkedKeys:r,halfCheckedKeys:void 0};else if(Pe(r)==="object")i={checkedKeys:r.checked||void 0,halfCheckedKeys:r.halfChecked||void 0};else return z(!1,"`checkedKeys` is not an array or an object"),null;return i}function _e(r,i){var p=new Set;function e(o){if(!p.has(o)){var l=i[o];if(l){p.add(o);var g=l.parent,t=l.node;t.disabled||g&&e(g.key)}}}return(r||[]).forEach(function(o){e(o)}),te(p)}function Dt(r,i){var p=N.useState(!1),e=ee(p,2),o=e[0],l=e[1];N.useLayoutEffect(function(){if(o)return r(),function(){i()}},[o]),N.useLayoutEffect(function(){return l(!0),function(){l(!1)}},[])}var St=["className","style","motion","motionNodes","motionType","onMotionStart","onMotionEnd","active","treeNodeRequiredProps"],Ze=function(i,p){var e=i.className,o=i.style,l=i.motion,g=i.motionNodes,t=i.motionType,n=i.onMotionStart,a=i.onMotionEnd,d=i.active,s=i.treeNodeRequiredProps,c=Ke(i,St),f=N.useState(!0),v=ee(f,2),h=v[0],y=v[1],u=N.useContext(Te),K=u.prefixCls,k=g&&t!=="hide";Xe(function(){g&&k!==h&&y(k)},[g]);var m=function(){g&&n()},x=N.useRef(!1),E=function(){g&&!x.current&&(x.current=!0,a())};Dt(m,E);var D=function(C){k===C&&E()};return g?N.createElement(lt,B({ref:p,visible:h},l,{motionAppear:t==="show",onVisibleChanged:D}),function(b,C){var S=b.className,T=b.style;return N.createElement("div",{ref:C,className:G("".concat(K,"-treenode-motion"),S),style:T},g.map(function(P){var O=B({},(Ye(P.data),P.data)),I=P.title,$=P.key,A=P.isStart,_=P.isEnd;delete O.children;var H=ue($,s);return N.createElement(fe,B({},O,H,{title:I,active:d,data:P.data,key:$,isStart:A,isEnd:_}))}))}):N.createElement(fe,B({domRef:p,className:e,style:o},c,{active:d}))};Ze.displayName="MotionTreeNode";var Pt=N.forwardRef(Ze);function Tt(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],p=r.length,e=i.length;if(Math.abs(p-e)!==1)return{add:!1,key:null};function o(l,g){var t=new Map;l.forEach(function(a){t.set(a,!0)});var n=g.filter(function(a){return!t.has(a)});return n.length===1?n[0]:null}return p<e?{add:!0,key:o(r,i)}:{add:!1,key:o(i,r)}}function Fe(r,i,p){var e=r.findIndex(function(t){return t.key===p}),o=r[e+1],l=i.findIndex(function(t){return t.key===p});if(o){var g=i.findIndex(function(t){return t.key===o.key});return i.slice(l+1,g)}return i.slice(l+1)}var Ot=["prefixCls","data","selectable","checkable","expandedKeys","selectedKeys","checkedKeys","loadedKeys","loadingKeys","halfCheckedKeys","keyEntities","disabled","dragging","dragOverNodeKey","dropPosition","motion","height","itemHeight","virtual","focusable","activeItem","focused","tabIndex","onKeyDown","onFocus","onBlur","onActiveChange","onListChangeStart","onListChangeEnd"],He={width:0,height:0,display:"flex",overflow:"hidden",opacity:0,border:0,padding:0,margin:0},wt=function(){},ne="RC_TREE_MOTION_".concat(Math.random()),Se={key:ne},et={key:ne,level:0,index:0,pos:"0",node:Se,nodes:[Se]},Ue={parent:null,children:[],pos:et.pos,data:Se,title:null,key:ne,isStart:[],isEnd:[]};function Ge(r,i,p,e){return i===!1||!p?r:r.slice(0,Math.ceil(p/e)+1)}function Be(r){var i=r.key,p=r.pos;return pe(i,p)}function Lt(r){for(var i=String(r.data.key),p=r;p.parent;)p=p.parent,i="".concat(p.data.key," > ").concat(i);return i}var tt=N.forwardRef(function(r,i){var p=r.prefixCls,e=r.data;r.selectable,r.checkable;var o=r.expandedKeys,l=r.selectedKeys,g=r.checkedKeys,t=r.loadedKeys,n=r.loadingKeys,a=r.halfCheckedKeys,d=r.keyEntities,s=r.disabled,c=r.dragging,f=r.dragOverNodeKey,v=r.dropPosition,h=r.motion,y=r.height,u=r.itemHeight,K=r.virtual,k=r.focusable,m=r.activeItem,x=r.focused,E=r.tabIndex,D=r.onKeyDown,b=r.onFocus,C=r.onBlur,S=r.onActiveChange,T=r.onListChangeStart,P=r.onListChangeEnd,O=Ke(r,Ot),I=N.useRef(null),$=N.useRef(null);N.useImperativeHandle(i,function(){return{scrollTo:function(q){I.current.scrollTo(q)},getIndentWidth:function(){return $.current.offsetWidth}}});var A=N.useState(o),_=ee(A,2),H=_[0],de=_[1],ie=N.useState(e),F=ee(ie,2),U=F[0],X=F[1],se=N.useState(e),ve=ee(se,2),ke=ve[0],ae=ve[1],me=N.useState([]),ge=ee(me,2),Ne=ge[0],W=ge[1],at=N.useState(null),we=ee(at,2),rt=we[0],xe=we[1],Le=N.useRef(e);Le.current=e;function Ce(){var L=Le.current;X(L),ae(L),W([]),xe(null),P()}Xe(function(){de(o);var L=Tt(H,o);if(L.key!==null)if(L.add){var q=U.findIndex(function(le){var ce=le.key;return ce===L.key}),J=Ge(Fe(U,e,L.key),K,y,u),re=U.slice();re.splice(q+1,0,Ue),ae(re),W(J),xe("show")}else{var Q=e.findIndex(function(le){var ce=le.key;return ce===L.key}),Z=Ge(Fe(e,U,L.key),K,y,u),he=e.slice();he.splice(Q+1,0,Ue),ae(he),W(Z),xe("hide")}else U!==e&&(X(e),ae(e))},[o,e]),N.useEffect(function(){c||Ce()},[c]);var ot=h?ke:e,Me={expandedKeys:o,selectedKeys:l,loadedKeys:t,loadingKeys:n,checkedKeys:g,halfCheckedKeys:a,dragOverNodeKey:f,dropPosition:v,keyEntities:d};return N.createElement(N.Fragment,null,x&&m&&N.createElement("span",{style:He,"aria-live":"assertive"},Lt(m)),N.createElement("div",null,N.createElement("input",{style:He,disabled:k===!1||s,tabIndex:k!==!1?E:null,onKeyDown:D,onFocus:b,onBlur:C,value:"",onChange:wt,"aria-label":"for screen reader"})),N.createElement("div",{className:"".concat(p,"-treenode"),"aria-hidden":!0,style:{position:"absolute",pointerEvents:"none",visibility:"hidden",height:0,overflow:"hidden",border:0,padding:0}},N.createElement("div",{className:"".concat(p,"-indent")},N.createElement("div",{ref:$,className:"".concat(p,"-indent-unit")}))),N.createElement(st,B({},O,{data:ot,itemKey:Be,height:y,fullHeight:!1,virtual:K,itemHeight:u,prefixCls:"".concat(p,"-list"),ref:I,onVisibleChange:function(q,J){var re=new Set(q),Q=J.filter(function(Z){return!re.has(Z)});Q.some(function(Z){return Be(Z)===ne})&&Ce()}}),function(L){var q=L.pos,J=B({},(Ye(L.data),L.data)),re=L.title,Q=L.key,Z=L.isStart,he=L.isEnd,le=pe(Q,q);delete J.key,delete J.children;var ce=ue(le,Me);return N.createElement(Pt,B({},J,ce,{title:re,active:!!m&&Q===m.key,pos:q,data:L.data,isStart:Z,isEnd:he,motion:h,motionNodes:Q===ne?Ne:null,motionType:rt,onMotionStart:T,onMotionEnd:Ce,treeNodeRequiredProps:Me,onMouseMove:function(){S(null)}}))}))});tt.displayName="NodeList";function Mt(r){var i=r.dropPosition,p=r.dropLevelOffset,e=r.indent,o={pointerEvents:"none",position:"absolute",right:0,backgroundColor:"red",height:2};switch(i){case-1:o.top=0,o.left=-p*e;break;case 1:o.bottom=0,o.left=-p*e;break;case 0:o.bottom=0,o.left=e;break}return N.createElement("div",{style:o})}var It=10,nt=function(r){je(p,r);var i=We(p);function p(){var e;qe(this,p);for(var o=arguments.length,l=new Array(o),g=0;g<o;g++)l[g]=arguments[g];return e=i.call.apply(i,[this].concat(l)),e.destroyed=!1,e.delayedDragEnterLogic=void 0,e.loadingRetryTimes={},e.state={keyEntities:{},indent:null,selectedKeys:[],checkedKeys:[],halfCheckedKeys:[],loadedKeys:[],loadingKeys:[],expandedKeys:[],draggingNodeKey:null,dragChildrenKeys:[],dropTargetKey:null,dropPosition:null,dropContainerKey:null,dropLevelOffset:null,dropTargetPos:null,dropAllowed:!0,dragOverNodeKey:null,treeData:[],flattenNodes:[],focused:!1,activeKey:null,listChanging:!1,prevProps:null,fieldNames:ye()},e.dragStartMousePosition=null,e.dragNode=void 0,e.currentMouseOverDroppableNodeKey=null,e.listRef=N.createRef(),e.onNodeDragStart=function(t,n){var a=e.state,d=a.expandedKeys,s=a.keyEntities,c=e.props.onDragStart,f=n.props.eventKey;e.dragNode=n,e.dragStartMousePosition={x:t.clientX,y:t.clientY};var v=j(d,f);e.setState({draggingNodeKey:f,dragChildrenKeys:Ct(f,s),indent:e.listRef.current.getIndentWidth()}),e.setExpandedKeys(v),window.addEventListener("dragend",e.onWindowDragEnd),c==null||c({event:t,node:M(n.props)})},e.onNodeDragEnter=function(t,n){var a=e.state,d=a.expandedKeys,s=a.keyEntities,c=a.dragChildrenKeys,f=a.flattenNodes,v=a.indent,h=e.props,y=h.onDragEnter,u=h.onExpand,K=h.allowDrop,k=h.direction,m=n.props,x=m.pos,E=m.eventKey,D=Y(e),b=D.dragNode;if(e.currentMouseOverDroppableNodeKey!==E&&(e.currentMouseOverDroppableNodeKey=E),!b){e.resetDragState();return}var C=$e(t,b,n,v,e.dragStartMousePosition,K,f,s,d,k),S=C.dropPosition,T=C.dropLevelOffset,P=C.dropTargetKey,O=C.dropContainerKey,I=C.dropTargetPos,$=C.dropAllowed,A=C.dragOverNodeKey;if(c.indexOf(P)!==-1||!$){e.resetDragState();return}if(e.delayedDragEnterLogic||(e.delayedDragEnterLogic={}),Object.keys(e.delayedDragEnterLogic).forEach(function(_){clearTimeout(e.delayedDragEnterLogic[_])}),b.props.eventKey!==n.props.eventKey&&(t.persist(),e.delayedDragEnterLogic[x]=window.setTimeout(function(){if(e.state.draggingNodeKey!==null){var _=te(d),H=s[n.props.eventKey];H&&(H.children||[]).length&&(_=V(d,n.props.eventKey)),"expandedKeys"in e.props||e.setExpandedKeys(_),u==null||u(_,{node:M(n.props),expanded:!0,nativeEvent:t.nativeEvent})}},800)),b.props.eventKey===P&&T===0){e.resetDragState();return}e.setState({dragOverNodeKey:A,dropPosition:S,dropLevelOffset:T,dropTargetKey:P,dropContainerKey:O,dropTargetPos:I,dropAllowed:$}),y==null||y({event:t,node:M(n.props),expandedKeys:d})},e.onNodeDragOver=function(t,n){var a=e.state,d=a.dragChildrenKeys,s=a.flattenNodes,c=a.keyEntities,f=a.expandedKeys,v=a.indent,h=e.props,y=h.onDragOver,u=h.allowDrop,K=h.direction,k=Y(e),m=k.dragNode;if(m){var x=$e(t,m,n,v,e.dragStartMousePosition,u,s,c,f,K),E=x.dropPosition,D=x.dropLevelOffset,b=x.dropTargetKey,C=x.dropContainerKey,S=x.dropAllowed,T=x.dropTargetPos,P=x.dragOverNodeKey;d.indexOf(b)!==-1||!S||(m.props.eventKey===b&&D===0?e.state.dropPosition===null&&e.state.dropLevelOffset===null&&e.state.dropTargetKey===null&&e.state.dropContainerKey===null&&e.state.dropTargetPos===null&&e.state.dropAllowed===!1&&e.state.dragOverNodeKey===null||e.resetDragState():E===e.state.dropPosition&&D===e.state.dropLevelOffset&&b===e.state.dropTargetKey&&C===e.state.dropContainerKey&&T===e.state.dropTargetPos&&S===e.state.dropAllowed&&P===e.state.dragOverNodeKey||e.setState({dropPosition:E,dropLevelOffset:D,dropTargetKey:b,dropContainerKey:C,dropTargetPos:T,dropAllowed:S,dragOverNodeKey:P}),y==null||y({event:t,node:M(n.props)}))}},e.onNodeDragLeave=function(t,n){e.currentMouseOverDroppableNodeKey===n.props.eventKey&&!t.currentTarget.contains(t.relatedTarget)&&(e.resetDragState(),e.currentMouseOverDroppableNodeKey=null);var a=e.props.onDragLeave;a==null||a({event:t,node:M(n.props)})},e.onWindowDragEnd=function(t){e.onNodeDragEnd(t,null,!0),window.removeEventListener("dragend",e.onWindowDragEnd)},e.onNodeDragEnd=function(t,n){var a=e.props.onDragEnd;e.setState({dragOverNodeKey:null}),e.cleanDragState(),a==null||a({event:t,node:M(n.props)}),e.dragNode=null,window.removeEventListener("dragend",e.onWindowDragEnd)},e.onNodeDrop=function(t,n){var a,d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,s=e.state,c=s.dragChildrenKeys,f=s.dropPosition,v=s.dropTargetKey,h=s.dropTargetPos,y=s.dropAllowed;if(y){var u=e.props.onDrop;if(e.setState({dragOverNodeKey:null}),e.cleanDragState(),v!==null){var K=R(R({},ue(v,e.getTreeNodeRequiredProps())),{},{active:((a=e.getActiveItem())===null||a===void 0?void 0:a.key)===v,data:e.state.keyEntities[v].node}),k=c.indexOf(v)!==-1;z(!k,"Can not drop to dragNode's children node. This is a bug of rc-tree. Please report an issue.");var m=Oe(h),x={event:t,node:M(K),dragNode:e.dragNode?M(e.dragNode.props):null,dragNodesKeys:[e.dragNode.props.eventKey].concat(c),dropToGap:f!==0,dropPosition:f+Number(m[m.length-1])};d||u==null||u(x),e.dragNode=null}}},e.cleanDragState=function(){var t=e.state.draggingNodeKey;t!==null&&e.setState({draggingNodeKey:null,dropPosition:null,dropContainerKey:null,dropTargetKey:null,dropLevelOffset:null,dropAllowed:!0,dragOverNodeKey:null}),e.dragStartMousePosition=null,e.currentMouseOverDroppableNodeKey=null},e.triggerExpandActionExpand=function(t,n){var a=e.state,d=a.expandedKeys,s=a.flattenNodes,c=n.expanded,f=n.key,v=n.isLeaf;if(!(v||t.shiftKey||t.metaKey||t.ctrlKey)){var h=s.filter(function(u){return u.key===f})[0],y=M(R(R({},ue(f,e.getTreeNodeRequiredProps())),{},{data:h.data}));e.setExpandedKeys(c?j(d,f):V(d,f)),e.onNodeExpand(t,y)}},e.onNodeClick=function(t,n){var a=e.props,d=a.onClick,s=a.expandAction;s==="click"&&e.triggerExpandActionExpand(t,n),d==null||d(t,n)},e.onNodeDoubleClick=function(t,n){var a=e.props,d=a.onDoubleClick,s=a.expandAction;s==="doubleClick"&&e.triggerExpandActionExpand(t,n),d==null||d(t,n)},e.onNodeSelect=function(t,n){var a=e.state.selectedKeys,d=e.state,s=d.keyEntities,c=d.fieldNames,f=e.props,v=f.onSelect,h=f.multiple,y=n.selected,u=n[c.key],K=!y;K?h?a=V(a,u):a=[u]:a=j(a,u);var k=a.map(function(m){var x=s[m];return x?x.node:null}).filter(function(m){return m});e.setUncontrolledState({selectedKeys:a}),v==null||v(a,{event:"select",selected:K,node:n,selectedNodes:k,nativeEvent:t.nativeEvent})},e.onNodeCheck=function(t,n,a){var d=e.state,s=d.keyEntities,c=d.checkedKeys,f=d.halfCheckedKeys,v=e.props,h=v.checkStrictly,y=v.onCheck,u=n.key,K,k={event:"check",node:n,checked:a,nativeEvent:t.nativeEvent};if(h){var m=a?V(c,u):j(c,u),x=j(f,u);K={checked:m,halfChecked:x},k.checkedNodes=m.map(function(T){return s[T]}).filter(function(T){return T}).map(function(T){return T.node}),e.setUncontrolledState({checkedKeys:m})}else{var E=Ee([].concat(te(c),[u]),!0,s),D=E.checkedKeys,b=E.halfCheckedKeys;if(!a){var C=new Set(D);C.delete(u);var S=Ee(Array.from(C),{checked:!1,halfCheckedKeys:b},s);D=S.checkedKeys,b=S.halfCheckedKeys}K=D,k.checkedNodes=[],k.checkedNodesPositions=[],k.halfCheckedKeys=b,D.forEach(function(T){var P=s[T];if(P){var O=P.node,I=P.pos;k.checkedNodes.push(O),k.checkedNodesPositions.push({node:O,pos:I})}}),e.setUncontrolledState({checkedKeys:D},!1,{halfCheckedKeys:b})}y==null||y(K,k)},e.onNodeLoad=function(t){var n=t.key,a=new Promise(function(d,s){e.setState(function(c){var f=c.loadedKeys,v=f===void 0?[]:f,h=c.loadingKeys,y=h===void 0?[]:h,u=e.props,K=u.loadData,k=u.onLoad;if(!K||v.indexOf(n)!==-1||y.indexOf(n)!==-1)return null;var m=K(t);return m.then(function(){var x=e.state.loadedKeys,E=V(x,n);k==null||k(E,{event:"load",node:t}),e.setUncontrolledState({loadedKeys:E}),e.setState(function(D){return{loadingKeys:j(D.loadingKeys,n)}}),d()}).catch(function(x){if(e.setState(function(D){return{loadingKeys:j(D.loadingKeys,n)}}),e.loadingRetryTimes[n]=(e.loadingRetryTimes[n]||0)+1,e.loadingRetryTimes[n]>=It){var E=e.state.loadedKeys;z(!1,"Retry for `loadData` many times but still failed. No more retry."),e.setUncontrolledState({loadedKeys:V(E,n)}),d()}s(x)}),{loadingKeys:V(y,n)}})});return a.catch(function(){}),a},e.onNodeMouseEnter=function(t,n){var a=e.props.onMouseEnter;a==null||a({event:t,node:n})},e.onNodeMouseLeave=function(t,n){var a=e.props.onMouseLeave;a==null||a({event:t,node:n})},e.onNodeContextMenu=function(t,n){var a=e.props.onRightClick;a&&(t.preventDefault(),a({event:t,node:n}))},e.onFocus=function(){var t=e.props.onFocus;e.setState({focused:!0});for(var n=arguments.length,a=new Array(n),d=0;d<n;d++)a[d]=arguments[d];t==null||t.apply(void 0,a)},e.onBlur=function(){var t=e.props.onBlur;e.setState({focused:!1}),e.onActiveChange(null);for(var n=arguments.length,a=new Array(n),d=0;d<n;d++)a[d]=arguments[d];t==null||t.apply(void 0,a)},e.getTreeNodeRequiredProps=function(){var t=e.state,n=t.expandedKeys,a=t.selectedKeys,d=t.loadedKeys,s=t.loadingKeys,c=t.checkedKeys,f=t.halfCheckedKeys,v=t.dragOverNodeKey,h=t.dropPosition,y=t.keyEntities;return{expandedKeys:n||[],selectedKeys:a||[],loadedKeys:d||[],loadingKeys:s||[],checkedKeys:c||[],halfCheckedKeys:f||[],dragOverNodeKey:v,dropPosition:h,keyEntities:y}},e.setExpandedKeys=function(t){var n=e.state,a=n.treeData,d=n.fieldNames,s=be(a,t,d);e.setUncontrolledState({expandedKeys:t,flattenNodes:s},!0)},e.onNodeExpand=function(t,n){var a=e.state.expandedKeys,d=e.state,s=d.listChanging,c=d.fieldNames,f=e.props,v=f.onExpand,h=f.loadData,y=n.expanded,u=n[c.key];if(!s){var K=a.indexOf(u),k=!y;if(z(y&&K!==-1||!y&&K===-1,"Expand state not sync with index check"),k?a=V(a,u):a=j(a,u),e.setExpandedKeys(a),v==null||v(a,{node:n,expanded:k,nativeEvent:t.nativeEvent}),k&&h){var m=e.onNodeLoad(n);m&&m.then(function(){var x=be(e.state.treeData,a,c);e.setUncontrolledState({flattenNodes:x})}).catch(function(){var x=e.state.expandedKeys,E=j(x,u);e.setExpandedKeys(E)})}}},e.onListChangeStart=function(){e.setUncontrolledState({listChanging:!0})},e.onListChangeEnd=function(){setTimeout(function(){e.setUncontrolledState({listChanging:!1})})},e.onActiveChange=function(t){var n=e.state.activeKey,a=e.props.onActiveChange;n!==t&&(e.setState({activeKey:t}),t!==null&&e.scrollTo({key:t}),a==null||a(t))},e.getActiveItem=function(){var t=e.state,n=t.activeKey,a=t.flattenNodes;return n===null?null:a.find(function(d){var s=d.key;return s===n})||null},e.offsetActiveKey=function(t){var n=e.state,a=n.flattenNodes,d=n.activeKey,s=a.findIndex(function(v){var h=v.key;return h===d});s===-1&&t<0&&(s=a.length),s=(s+t+a.length)%a.length;var c=a[s];if(c){var f=c.key;e.onActiveChange(f)}else e.onActiveChange(null)},e.onKeyDown=function(t){var n=e.state,a=n.activeKey,d=n.expandedKeys,s=n.checkedKeys,c=n.fieldNames,f=e.props,v=f.onKeyDown,h=f.checkable,y=f.selectable;switch(t.which){case oe.UP:{e.offsetActiveKey(-1),t.preventDefault();break}case oe.DOWN:{e.offsetActiveKey(1),t.preventDefault();break}}var u=e.getActiveItem();if(u&&u.data){var K=e.getTreeNodeRequiredProps(),k=u.data.isLeaf===!1||!!(u.data[c.children]||[]).length,m=M(R(R({},ue(a,K)),{},{data:u.data,active:!0}));switch(t.which){case oe.LEFT:{k&&d.includes(a)?e.onNodeExpand({},m):u.parent&&e.onActiveChange(u.parent.key),t.preventDefault();break}case oe.RIGHT:{k&&!d.includes(a)?e.onNodeExpand({},m):u.children&&u.children.length&&e.onActiveChange(u.children[0].key),t.preventDefault();break}case oe.ENTER:case oe.SPACE:{h&&!m.disabled&&m.checkable!==!1&&!m.disableCheckbox?e.onNodeCheck({},m,!s.includes(a)):!h&&y&&!m.disabled&&m.selectable!==!1&&e.onNodeSelect({},m);break}}}v==null||v(t)},e.setUncontrolledState=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null;if(!e.destroyed){var d=!1,s=!0,c={};Object.keys(t).forEach(function(f){if(f in e.props){s=!1;return}d=!0,c[f]=t[f]}),d&&(!n||s)&&e.setState(R(R({},c),a))}},e.scrollTo=function(t){e.listRef.current.scrollTo(t)},e}return Ve(p,[{key:"componentDidMount",value:function(){this.destroyed=!1,this.onUpdated()}},{key:"componentDidUpdate",value:function(){this.onUpdated()}},{key:"onUpdated",value:function(){var o=this.props.activeKey;o!==void 0&&o!==this.state.activeKey&&(this.setState({activeKey:o}),o!==null&&this.scrollTo({key:o}))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("dragend",this.onWindowDragEnd),this.destroyed=!0}},{key:"resetDragState",value:function(){this.setState({dragOverNodeKey:null,dropPosition:null,dropLevelOffset:null,dropTargetKey:null,dropContainerKey:null,dropTargetPos:null,dropAllowed:!1})}},{key:"render",value:function(){var o,l=this.state,g=l.focused,t=l.flattenNodes,n=l.keyEntities,a=l.draggingNodeKey,d=l.activeKey,s=l.dropLevelOffset,c=l.dropContainerKey,f=l.dropTargetKey,v=l.dropPosition,h=l.dragOverNodeKey,y=l.indent,u=this.props,K=u.prefixCls,k=u.className,m=u.style,x=u.showLine,E=u.focusable,D=u.tabIndex,b=D===void 0?0:D,C=u.selectable,S=u.showIcon,T=u.icon,P=u.switcherIcon,O=u.draggable,I=u.checkable,$=u.checkStrictly,A=u.disabled,_=u.motion,H=u.loadData,de=u.filterTreeNode,ie=u.height,F=u.itemHeight,U=u.virtual,X=u.titleRender,se=u.dropIndicatorRender,ve=u.onContextMenu,ke=u.onScroll,ae=u.direction,me=u.rootClassName,ge=u.rootStyle,Ne=ze(this.props,{aria:!0,data:!0}),W;return O&&(Pe(O)==="object"?W=O:typeof O=="function"?W={nodeDraggable:O}:W={}),N.createElement(Te.Provider,{value:{prefixCls:K,selectable:C,showIcon:S,icon:T,switcherIcon:P,draggable:W,draggingNodeKey:a,checkable:I,checkStrictly:$,disabled:A,keyEntities:n,dropLevelOffset:s,dropContainerKey:c,dropTargetKey:f,dropPosition:v,dragOverNodeKey:h,indent:y,direction:ae,dropIndicatorRender:se,loadData:H,filterTreeNode:de,titleRender:X,onNodeClick:this.onNodeClick,onNodeDoubleClick:this.onNodeDoubleClick,onNodeExpand:this.onNodeExpand,onNodeSelect:this.onNodeSelect,onNodeCheck:this.onNodeCheck,onNodeLoad:this.onNodeLoad,onNodeMouseEnter:this.onNodeMouseEnter,onNodeMouseLeave:this.onNodeMouseLeave,onNodeContextMenu:this.onNodeContextMenu,onNodeDragStart:this.onNodeDragStart,onNodeDragEnter:this.onNodeDragEnter,onNodeDragOver:this.onNodeDragOver,onNodeDragLeave:this.onNodeDragLeave,onNodeDragEnd:this.onNodeDragEnd,onNodeDrop:this.onNodeDrop}},N.createElement("div",{role:"tree",className:G(K,k,me,(o={},w(o,"".concat(K,"-show-line"),x),w(o,"".concat(K,"-focused"),g),w(o,"".concat(K,"-active-focused"),d!==null),o)),style:ge},N.createElement(tt,B({ref:this.listRef,prefixCls:K,style:m,data:t,disabled:A,selectable:C,checkable:!!I,motion:_,dragging:a!==null,height:ie,itemHeight:F,virtual:U,focusable:E,focused:g,tabIndex:b,activeItem:this.getActiveItem(),onFocus:this.onFocus,onBlur:this.onBlur,onKeyDown:this.onKeyDown,onActiveChange:this.onActiveChange,onListChangeStart:this.onListChangeStart,onListChangeEnd:this.onListChangeEnd,onContextMenu:ve,onScroll:ke},this.getTreeNodeRequiredProps(),Ne))))}}],[{key:"getDerivedStateFromProps",value:function(o,l){var g=l.prevProps,t={prevProps:o};function n(E){return!g&&E in o||g&&g[E]!==o[E]}var a,d=l.fieldNames;if(n("fieldNames")&&(d=ye(o.fieldNames),t.fieldNames=d),n("treeData")?a=o.treeData:n("children")&&(z(!1,"`children` of Tree is deprecated. Please use `treeData` instead."),a=gt(o.children)),a){t.treeData=a;var s=yt(a,{fieldNames:d});t.keyEntities=R(w({},ne,et),s.keyEntities)}var c=t.keyEntities||l.keyEntities;if(n("expandedKeys")||g&&n("autoExpandParent"))t.expandedKeys=o.autoExpandParent||!g&&o.defaultExpandParent?_e(o.expandedKeys,c):o.expandedKeys;else if(!g&&o.defaultExpandAll){var f=R({},c);delete f[ne],t.expandedKeys=Object.keys(f).map(function(E){return f[E].key})}else!g&&o.defaultExpandedKeys&&(t.expandedKeys=o.autoExpandParent||o.defaultExpandParent?_e(o.defaultExpandedKeys,c):o.defaultExpandedKeys);if(t.expandedKeys||delete t.expandedKeys,a||t.expandedKeys){var v=be(a||l.treeData,t.expandedKeys||l.expandedKeys,d);t.flattenNodes=v}if(o.selectable&&(n("selectedKeys")?t.selectedKeys=Ae(o.selectedKeys,o):!g&&o.defaultSelectedKeys&&(t.selectedKeys=Ae(o.defaultSelectedKeys,o))),o.checkable){var h;if(n("checkedKeys")?h=De(o.checkedKeys)||{}:!g&&o.defaultCheckedKeys?h=De(o.defaultCheckedKeys)||{}:a&&(h=De(o.checkedKeys)||{checkedKeys:l.checkedKeys,halfCheckedKeys:l.halfCheckedKeys}),h){var y=h,u=y.checkedKeys,K=u===void 0?[]:u,k=y.halfCheckedKeys,m=k===void 0?[]:k;if(!o.checkStrictly){var x=Ee(K,!0,c);K=x.checkedKeys,m=x.halfCheckedKeys}t.checkedKeys=K,t.halfCheckedKeys=m}}return n("loadedKeys")&&(t.loadedKeys=o.loadedKeys),t}}]),p}(N.Component);nt.defaultProps={prefixCls:"rc-tree",showLine:!1,showIcon:!0,selectable:!0,multiple:!1,checkable:!1,disabled:!1,checkStrictly:!1,draggable:!1,defaultExpandParent:!0,autoExpandParent:!1,defaultExpandAll:!1,defaultExpandedKeys:[],defaultCheckedKeys:[],defaultSelectedKeys:[],dropIndicatorRender:Mt,allowDrop:function(){return!0},expandAction:!1};nt.TreeNode=fe;export{fe as C,nt as T,_e as a,gt as b,yt as c,Ee as d,j as e,V as f};