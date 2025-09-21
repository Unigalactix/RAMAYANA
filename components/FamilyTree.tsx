import React from 'react';
import { familyTreeData } from '../constants';
import { FamilyTreeNode } from '../types';

interface TreeNodeProps {
  node: FamilyTreeNode;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  return (
    <li>
      <div className="tree-node-content">
        <div className="tree-node-name">{node.name}</div>
        {node.spouse && <div className="tree-node-spouse">& {node.spouse}</div>}
      </div>
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const FamilyTree: React.FC = () => {
  return (
    <div className="family-tree">
      <ul>
        <TreeNode node={familyTreeData} />
      </ul>
    </div>
  );
};

export default FamilyTree;
