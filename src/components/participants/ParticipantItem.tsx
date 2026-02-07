import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Participant } from '../../types/participant';
import { DragHandleIcon } from '../icons/DragHandleIcon';
import { getParticipantImageUrl } from '../../utils/imageUtils';

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

  const imageUrl = getParticipantImageUrl(data.imageId);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white shadow-sm touch-none"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
        aria-label="Reorder"
      >
        <DragHandleIcon />
      </button>

      <div className="relative shrink-0">
        <div className="w-24 h-[72px] rounded overflow-hidden bg-gray-100 border border-gray-100">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={data.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold">
              IMG
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-800 text-lg truncate">
          {data.name}
        </div>
      </div>
    </div>
  );
};