import{R as o}from"./react-3cd55195.js";const C=o.createContext({}),x=!0;function N({baseColor:s,highlightColor:l,width:i,height:a,borderRadius:c,circle:y,direction:m,duration:r,enableAnimation:f=x}){const e={};return m==="rtl"&&(e["--animation-direction"]="reverse"),typeof r=="number"&&(e["--animation-duration"]=`${r}s`),f||(e["--pseudo-element-display"]="none"),(typeof i=="string"||typeof i=="number")&&(e.width=i),(typeof a=="string"||typeof a=="number")&&(e.height=a),(typeof c=="string"||typeof c=="number")&&(e.borderRadius=c),y&&(e.borderRadius="50%"),typeof s<"u"&&(e["--base-color"]=s),typeof l<"u"&&(e["--highlight-color"]=l),e}function A({count:s=1,wrapper:l,className:i,containerClassName:a,containerTestId:c,circle:y=!1,style:m,...r}){var f,e,u;const O=o.useContext(C),v={...r};for(const[t,n]of Object.entries(r))typeof n>"u"&&delete v[t];const d={...O,...v,circle:y},$={...m,...N(d)};let h="react-loading-skeleton";i&&(h+=` ${i}`);const g=(f=d.inline)!==null&&f!==void 0?f:!1,p=[],b=Math.ceil(s);for(let t=0;t<b;t++){let n=$;if(b>s&&t===b-1){const k=(e=n.width)!==null&&e!==void 0?e:"100%",S=s%1,w=typeof k=="number"?k*S:`calc(${k} * ${S})`;n={...n,width:w}}const E=o.createElement("span",{className:h,style:n,key:t},"‌");g?p.push(E):p.push(o.createElement(o.Fragment,{key:t},E,o.createElement("br",null)))}return o.createElement("span",{className:a,"data-testid":c,"aria-live":"polite","aria-busy":(u=d.enableAnimation)!==null&&u!==void 0?u:x},l?p.map((t,n)=>o.createElement(l,{key:n},t)):p)}export{A as S};