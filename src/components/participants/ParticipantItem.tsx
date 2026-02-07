import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Participant } from '../../types/participant';
import { DragHandleIcon } from '../icons/DragHandleIcon';
import { getParticipantImageUrl } from '../../utils/imageUtils';
import { Badge } from '../layout/Badge'; // Перевір шлях до компонента Badge

interface ParticipantItemProps {
  data: Participant;
  index: number;
}

export const ParticipantItem = ({ data, index }: ParticipantItemProps) => {
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

  const getRankStyles = (rankIndex: number) => {
    if (rankIndex === 0) return 'border-yellow-400 ring-1 ring-yellow-400 bg-yellow-50/10';
    if (rankIndex === 1) return 'border-slate-400 ring-1 ring-slate-400 bg-slate-50/10';
    if (rankIndex === 2) return 'border-amber-700 ring-1 ring-amber-700 bg-orange-50/10';
    return 'border-gray-200 bg-white';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex items-center gap-3 p-3 border rounded-xl shadow-sm touch-none transition-colors ${getRankStyles(index)}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 focus:outline-none rounded touch-none shrink-0"
        aria-label="Reorder"
      >
        <DragHandleIcon />
      </button>

      <div className="relative shrink-0">
        {/* Повернув оригінальні розміри для прямокутного формату */}
        <div className="w-24 h-[72px] rounded overflow-hidden bg-gray-100 border border-gray-100">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={data.name} 
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold">
              IMG
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex items-center gap-2">
        <Badge variant="default" className="shrink-0">
          #{data.id}
        </Badge>
        
        <div className="font-bold text-gray-800 text-lg truncate leading-tight">
          {data.name}
        </div>
      </div>
    </div>
  );
};