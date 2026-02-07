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
    if (rankIndex === 0) return 'border-yellow-400 ring-1 ring-yellow-400 shadow-[0_2px_8px_-1px_rgba(250,204,21,0.4)] z-10 dark:border-yellow-500 dark:ring-yellow-500';
    if (rankIndex === 1) return 'border-slate-400 ring-1 ring-slate-400 shadow-[0_2px_8px_-1px_rgba(148,163,184,0.4)] z-10 dark:border-slate-500 dark:ring-slate-500';
    if (rankIndex === 2) return 'border-amber-700 ring-1 ring-amber-700 shadow-[0_2px_8px_-1px_rgba(180,83,9,0.3)] z-10 dark:border-amber-600 dark:ring-amber-600';
    
    return 'border-neutral-200 shadow-sm hover:border-neutral-300 dark:border-slate-700 dark:hover:border-slate-600';
  };

  const handleInputInteraction = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const card = e.currentTarget.closest('[data-participant-card]');
    
    setTimeout(() => {
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-participant-card
      className={`relative flex items-stretch gap-2 pl-2 py-2 pr-1 border rounded-lg transition-colors bg-white dark:bg-slate-800 ${getRankStyles(index)}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-8 z-20 opacity-0 cursor-grab active:cursor-grabbing touch-none"
        aria-label="Drag Handle Left"
      />

      <div className="relative shrink-0">
        <div className="w-[86px] h-[65px] rounded-md overflow-hidden bg-neutral-100 border border-neutral-100 dark:bg-slate-700 dark:border-slate-700">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={data.name} 
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs font-bold dark:text-slate-500">
              IMG
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col h-[65px]">
        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
          <Badge variant="default" className="shrink-0 text-sm px-1.5 h-[24px] flex items-center justify-center min-w-[28px] dark:bg-indigo-900/50 dark:text-indigo-200 dark:border-indigo-800">
            #{data.id}
          </Badge>
          
          <div className="font-bold text-neutral-900 text-lg truncate leading-none pt-0.5 dark:text-slate-100">
            {data.name}
          </div>
        </div>

        <div className="flex-1 min-h-0 mt-0.5">
          <textarea
            className="w-full h-full resize-none text-[11px] leading-[1.3] bg-transparent border border-transparent rounded px-1 py-1 transition-all duration-300 ease-in-out focus:outline-none focus:border-neutral-200 focus:bg-neutral-50 text-neutral-600 placeholder:text-neutral-400/80 align-top overflow-hidden dark:text-slate-300 dark:focus:bg-slate-700 dark:focus:border-slate-600 dark:placeholder:text-slate-500"
            placeholder="Додати нотатку..."
            value={data.comment || ''}
            onChange={(e) => updateParticipant(data.id, { comment: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
            onFocus={handleInputInteraction}
            onClick={handleInputInteraction}
            maxLength={60}
            spellCheck={false}
            onPointerDown={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <div className="flex items-center justify-center pl-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-0 w-6 text-neutral-300 hover:text-neutral-500 focus:outline-none rounded touch-none shrink-0 flex items-center justify-center dark:text-slate-600 dark:hover:text-slate-400"
          aria-label="Reorder"
        >
          <DragHandleIcon />
        </button>
      </div>
    </div>
  );
};