import React from 'react';
import { familyTreeData } from '../constants';
import { FamilyTreeNode } from '../types';

interface TreeNodeProps {
  node: FamilyTreeNode;
  isRoot?: boolean;
}

const GENERATION_COLORS: Record<number, { border: string; bg: string; nameBg: string }> = {
  0: { border: 'border-[#FFD700]', bg: 'bg-[#fffbe8] dark:bg-[#3b2a29]', nameBg: 'bg-[#FFD700]' },
  1: { border: 'border-[#FF9933]', bg: 'bg-[#fff5e8] dark:bg-[#3b2820]', nameBg: 'bg-[#FF9933]' },
  2: { border: 'border-[#005B96]', bg: 'bg-[#e8f2fb] dark:bg-[#1a2535]', nameBg: 'bg-[#005B96]' },
};

const NodeCard: React.FC<{ node: FamilyTreeNode; depth: number }> = ({ node, depth }) => {
  const colors = GENERATION_COLORS[Math.min(depth, 2)];
  return (
    <div className={`flex flex-col items-center gap-1 rounded-xl border-2 ${colors.border} ${colors.bg} px-4 py-3 shadow-md min-w-[120px] max-w-[160px] text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg`}>
      <span className={`font-anton text-sm uppercase tracking-wide text-white ${colors.nameBg} px-2 py-0.5 rounded-full`}>
        {node.name}
      </span>
      {node.spouse && (
        <span className="text-xs text-[#FF9933] italic mt-0.5">& {node.spouse}</span>
      )}
    </div>
  );
};

const TreeNode: React.FC<TreeNodeProps & { depth: number }> = ({ node, depth }) => {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <NodeCard node={node} depth={depth} />
      {hasChildren && (
        <>
          {/* vertical line down from parent */}
          <div className="w-0.5 h-6 bg-[#4A2E2C] dark:bg-[#a39483]" />
          {/* horizontal connector */}
          <div className="relative flex items-start justify-center">
            {/* top horizontal bar */}
            {node.children!.length > 1 && (
              <div
                className="absolute top-0 h-0.5 bg-[#4A2E2C] dark:bg-[#a39483]"
                style={{
                  left: `calc(50% / ${node.children!.length} * 1)`,
                  right: `calc(50% / ${node.children!.length} * 1)`,
                  width: `calc(100% - (100% / ${node.children!.length}))`,
                  marginLeft: `calc(100% / ${node.children!.length} / 2)`,
                  marginRight: `calc(100% / ${node.children!.length} / 2)`,
                }}
              />
            )}
            <div className="flex gap-6 md:gap-10 items-start pt-6 relative">
              {/* horizontal bar rendered as absolute overlay */}
              {node.children!.length > 1 && (
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 bg-[#4A2E2C] dark:bg-[#a39483]"
                  aria-hidden="true"
                />
              )}
              {node.children!.map((child, i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* vertical line from top bar down to child */}
                  <div className="w-0.5 h-6 bg-[#4A2E2C] dark:bg-[#a39483]" />
                  <TreeNode node={child} depth={depth + 1} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const FamilyTree: React.FC = () => {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex justify-center min-w-max mx-auto px-4">
        <TreeNode node={familyTreeData} depth={0} />
      </div>
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {[
          { color: 'bg-[#FFD700]', label: 'King Dasharatha' },
          { color: 'bg-[#FF9933]', label: 'Sons & Spouses' },
          { color: 'bg-[#005B96]', label: 'Grandchildren' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-[#4A2E2C] dark:text-[#FBF5E8]">
            <span className={`w-3 h-3 rounded-full ${item.color}`} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyTree;

