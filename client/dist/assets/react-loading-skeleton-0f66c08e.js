import{R as n}from"./react-03735257.js";const x=n.createContext({}),O=!0;function N({baseColor:o,highlightColor:s,width:l,height:a,borderRadius:r,circle:u,direction:m,duration:c,enableAnimation:f=O}){const e={};return m==="rtl"&&(e["--animation-direction"]="reverse"),typeof c=="number"&&(e["--animation-duration"]=`${c}s`),f||(e["--pseudo-element-display"]="none"),(typeof l=="string"||typeof l=="number")&&(e.width=l),(typeof a=="string"||typeof a=="number")&&(e.height=a),(typeof r=="string"||typeof r=="number")&&(e.borderRadius=r),u&&(e.borderRadius="50%"),typeof o<"u"&&(e["--base-color"]=o),typeof s<"u"&&(e["--highlight-color"]=s),e}function _({count:o=1,wrapper:s,className:l,containerClassName:a,containerTestId:r,circle:u=!1,style:m,...c}){var f,e,y;const $=n.useContext(x),v={...c};for(const[t,i]of Object.entries(c))typeof i>"u"&&delete v[t];const d={...$,...v,circle:u},g={...m,...N(d)};let h="react-loading-skeleton";l&&(h+=` ${l}`);const w=(f=d.inline)!==null&&f!==void 0?f:!1,p=[],b=Math.ceil(o);for(let t=0;t<b;t++){let i=g;if(b>o&&t===b-1){const k=(e=i.width)!==null&&e!==void 0?e:"100%",S=o%1,C=typeof k=="number"?k*S:`calc(${k} * ${S})`;i={...i,width:C}}const E=n.createElement("span",{className:h,style:i,key:t},"‌");w?p.push(E):p.push(n.createElement(n.Fragment,{key:t},E,n.createElement("br",null)))}return n.createElement("span",{className:a,"data-testid":r,"aria-live":"polite","aria-busy":(y=d.enableAnimation)!==null&&y!==void 0?y:O},s?p.map((t,i)=>n.createElement(s,{key:i},t)):p)}function A({children:o,...s}){return n.createElement(x.Provider,{value:s},o)}export{_ as S,A as a};
