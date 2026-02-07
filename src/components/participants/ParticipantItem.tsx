import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Participant } from '../../types/participant';
import { DragHandleIcon } from '../icons/DragHandleIcon';
import { getParticipantImageUrl } from '../../utils/imageUtils';
import { Badge } from '../layout/Badge';
import { useParticipantStore } from '../../store/participantStore';

interface ParticipantItemProps {
  data: Participant;
  index: number;
}

export const ParticipantItem = ({ data, index }: ParticipantItemProps) => {
  const updateParticipant = useParticipantStore((state) => state.updateParticipant);

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
    // Всі картки тепер мають bg-white. Кольори обводки залишаються для топ-3.
    if (rankIndex === 0) return 'border-yellow-400 ring-1 ring-yellow-400 bg-white shadow-sm';
    if (rankIndex === 1) return 'border-neutral-400 ring-1 ring-neutral-400 bg-white shadow-sm';
    if (rankIndex === 2) return 'border-amber-700 ring-1 ring-amber-700 bg-white shadow-sm';
    
    // Стандартний стиль
    return 'border-neutral-200 bg-white shadow-sm';
  };

  const handleInputInteraction = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const card = e.currentTarget.closest('[data-participant-card]');
    
    setTimeout(() => {
      card?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    }, 400);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-participant-card
      className={`scroll-mb-3 relative flex items-stretch gap-1 pl-1.5 py-1.5 pr-1 border rounded-lg transition-colors ${getRankStyles(index)}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-8 z-20 opacity-0 cursor-grab active:cursor-grabbing touch-none"
        aria-label="Drag Handle Left"
      />

      <div className="relative shrink-0">
        <div className="w-[86px] h-[65px] rounded-md overflow-hidden bg-neutral-100 border border-neutral-100">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={data.name} 
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs font-bold">
              IMG
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex items-center gap-1.5">
          <Badge variant="default" className="shrink-0 scale-90 origin-left">
            #{data.id}
          </Badge>
          
          <div className="font-bold text-neutral-800 text-sm truncate leading-tight">
            {data.name}
          </div>
        </div>

        <textarea
          className="w-full h-[38px] resize-none text-[11px] leading-3 bg-neutral-50 border border-neutral-200 rounded px-1.5 py-1 focus:outline-none focus:border-neutral-400 focus:bg-white text-neutral-600 placeholder:text-neutral-300"
          placeholder="Коментар..."
          value={data.comment || ''}
          onChange={(e) => updateParticipant(data.id, { comment: e.target.value })}
          onFocus={handleInputInteraction}
          onClick={handleInputInteraction}
          maxLength={140}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-0 w-6 text-neutral-400 hover:text-neutral-600 focus:outline-none rounded touch-none shrink-0 flex items-center justify-center"
          aria-label="Reorder"
        >
          <DragHandleIcon />
        </button>
      </div>
    </div>
  );
};