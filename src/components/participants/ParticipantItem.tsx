import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Participant } from '../../types/participant';
import { DragHandleIcon } from '../icons/DragHandleIcon';

interface ParticipantItemProps {
  data: Participant;
}

export const ParticipantItem = ({ data }: ParticipantItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 border border-gray-200 rounded bg-white shadow-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
        aria-label="Reorder"
      >
        <DragHandleIcon />
      </button>
      <div className="flex-1 font-medium text-gray-800">
        {data.name}
      </div>
    </div>
  );
};