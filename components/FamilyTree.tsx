import React from 'react';
import { familyTreeData } from '../constants';
import { FamilyTreeNode } from '../types';

const Node: React.FC<{ node: FamilyTreeNode }> = ({ node }) => (
  <div className="flex flex-col items-center">
    <div className="ft-node">
      <div className="ft-name">{node.name}</div>
      {node.spouse && <div className="ft-spouse">∞ {node.spouse}</div>}
    </div>
    {node.children && node.children.length > 0 && (
      <>
        <div className="ft-connector" />
        <div className="ft-row">
          {node.children.map((c, i) => (
            <React.Fragment key={c.name + i}>
              <Node node={c} />
            </React.Fragment>
          ))}
        </div>
      </>
    )}
  </div>
);

const FamilyTree: React.FC = () => (
  <div className="glass p-4 md:p-8 overflow-x-auto">
    <div className="ft-tree mx-auto">
      <Node node={familyTreeData} />
    </div>
  </div>
);

export default FamilyTree;
