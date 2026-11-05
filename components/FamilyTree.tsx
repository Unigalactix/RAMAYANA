import React, { useState } from 'react';
import { familyTreeData } from '../constants';
import { FamilyTreeNode } from '../types';

const FamilyTree: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState<FamilyTreeNode>(familyTreeData);

  const Node: React.FC<{ node: FamilyTreeNode }> = ({ node }) => (
    <div className="flex flex-col items-center">
      <button className={`ft-node ${selected.name === node.name ? 'selected' : ''}`} onClick={() => setSelected(node)} aria-pressed={selected.name === node.name} aria-label={`Select ${node.name}`}>
        <div className="ft-name">{node.name}</div>
        {node.spouse && <div className="ft-spouse">∞ {node.spouse}</div>}
      </button>
      {node.children && node.children.length > 0 && (
        <>
          <div className="ft-connector" />
          <div className="ft-row">
            {node.children.map((c, i) => (<Node key={c.name + i} node={c} />))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="glass p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="font-serif italic text-[#d8cdb0]">Tap any name for its place in the line. Use the controls to zoom the tree.</p>
        <div className="flex gap-2" role="group" aria-label="Family tree zoom">
          <button className="chip" onClick={() => setZoom(z => Math.max(0.6, +(z - 0.15).toFixed(2)))} aria-label="Zoom out">−</button>
          <span className="chip !cursor-default" aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button className="chip" onClick={() => setZoom(z => Math.min(1.6, +(z + 0.15).toFixed(2)))} aria-label="Zoom in">+</button>
          <button className="chip" onClick={() => setZoom(1)}>Reset</button>
        </div>
      </div>
      <div className="ft-viewport">
        <div className="ft-tree mx-auto" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', width: 'max-content', minWidth: '100%' }}>
          <Node node={familyTreeData} />
        </div>
      </div>
      <div className="mt-5 rounded-xl border border-gold/25 bg-[rgba(212,175,55,.06)] p-4 text-center" aria-live="polite">
        <span className="font-display text-xl text-gradient-gold">{selected.name}</span>
        {selected.spouse && <span className="font-serif text-[#e8ddba]"> · wedded to {selected.spouse}</span>}
        <span className="font-serif text-[#e8ddba]">{selected.children?.length ? ` · ${selected.children.length} ${selected.children.length === 1 ? 'child' : 'children'} in this line: ${selected.children.map(c => c.name).join(', ')}` : ' · of the Solar line of Ikshvaku'}</span>
      </div>
    </div>
  );
};

export default FamilyTree;
