import { addIcon } from 'obsidian';

type SvgStyleType = 'fill' | 'stroke';
const svgWrapper = (innerSVG: string, mode: SvgStyleType = 'stroke') =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon" ${mode === 'fill' ? 'stroke="transparent" fill="currentColor"' : 'stroke="currentColor" fill="transparent"'}> ${innerSVG.trim().replace(/\n/g, '')}</svg>`;

type Icon = {
    name: string;
    svg: string;
    mode: SvgStyleType;
};

const cards: Icon = {
    name: 'lineage-cards',
    svg: `
    <path
    d="m 13.115181,16.644424 h 6.605231 v 5.578301 H 13.115181 Z M 4.3082043,9.2066877 H 10.913436 V 14.784989 H 4.3082043 Z m 8.8069767,0 h 6.605231 v 5.5783013 h -6.605231 z m 0,-7.4377346 h 6.605231 V 7.347254 h -6.605231 z"
    />
  `,
    mode: 'fill',
};

const split: Icon = {
    name: 'lineage-split',
    svg: `<path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/>`,
    mode: 'stroke',
};

const alignH: Icon = {
    name: 'lineage-align-horizontal',
    svg: `<g> 
            <rect width="20" height="12" x="2" y="6" rx="2"/> 
            <line x1="12" y1="0" x2="12" y2="24" stroke-dasharray="4 3" />
    </g> `,
    mode: 'stroke',
};

const alignV: Icon = {
    name: 'lineage-align-vertical',
    svg: `<g> 
            <rect width="18" height="12" x="3" y="6" rx="2"/> 
        
         <path
      <path
       style="stroke-width:2;stroke-dasharray:8, 2;stroke-dashoffset:0"
       d="m -14.007348,12.000818 c 15.3564398,3.95e-4 30.79516,0.16535 46.069016,5.77e-4"
       id="path5"
       sodipodi:nodetypes="cc" />

    </g> `,
    mode: 'stroke',
};

const gap: Icon = {
    name: 'cards-gap',
    svg: `  
                <rect width="20" height="12" x="-11.600009" y="6" rx="2" />
                <rect
                    width="20"
                    height="12"
                    x="16.534304"
                    y="5.9783392"
                    rx="2"
                />
          `,
    mode: 'stroke',
};

const outline: Icon = {
    name: 'outline',
    svg: `<path d="M 7.563873,12 H 21.24698" />
  <path d="M 7.56116,18 H 21.159058" />
  <path d="M3 6h18" /> `,
    mode: 'stroke',
};

export const customIcons = { cards, split, alignH, alignV, gap, outline };

export const loadCustomIcons = () => {
    for (const icon of Object.values(customIcons)) {
        icon.svg = svgWrapper(icon.svg, icon.mode);
        addIcon(icon.name, icon.svg);
    }
};
