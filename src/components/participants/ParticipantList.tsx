import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import type { Participant } from '../../types/participant';
import { ParticipantItem } from './ParticipantItem';

interface ParticipantListProps {
  items: Participant[];
  onReorder: (newItems: Participant[]) => void;
}

export const ParticipantList = ({ items, onReorder }: ParticipantListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, 
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2 w-full max-w-md mx-auto p-4">
          {items.map((item) => (
            <ParticipantItem key={item.id} data={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};