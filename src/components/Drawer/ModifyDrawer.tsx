import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import useDrawerStore from '@/store/drawerStore';
import { useEditLogStore } from '@/store/editLogStore';
import { useRegisterStore } from '@/store/registerStore';
import { DialogDescription } from '@radix-ui/react-dialog';
import { ArrowDown, ArrowUp, Trash } from 'lucide-react';
import { Drawer } from 'vaul';
import { Button } from '../ui/button';
import { DrawerTitle } from '../ui/drawer';

const ModifyDrawer = () => {
  const isOpen = useDrawerStore((state) => state.isOpen);
  const newLogTargetPlace = useDrawerStore((state) => state.newLogTargetPlace);
  const editTargetPlace = useDrawerStore((state) => state.editTargetPlace);
  const closeModal = useDrawerStore((state) => state.closeDrawer);

  const {
    removeSelectedPlace: removeRegisterPlace,
    moveUpSelectedPlace: moveUpRegisterPlace,
    moveDownSelectedPlace: moveDownRegisterPlace,
  } = useRegisterStore();

  const {
    removeSelectedPlace: removeEditPlace,
    moveUpSelectedPlace: moveUpEditPlace,
    moveDownSelectedPlace: moveDownEditPlace,
  } = useEditLogStore();

  // 현재 선택된 장소를 확인 (수정 페이지인지 등록 페이지인지)
  const isEditingLog = !!editTargetPlace;
  const targetPlace = isEditingLog ? editTargetPlace : newLogTargetPlace;

  if (!targetPlace) return null;

  const handleUpClick = () =>
    isEditingLog
      ? moveUpEditPlace(targetPlace as PlaceInLog)
      : moveUpRegisterPlace(targetPlace as kakao.maps.services.PlacesSearchResultItem);

  const handleDownClick = () =>
    isEditingLog
      ? moveDownEditPlace(targetPlace as PlaceInLog)
      : moveDownRegisterPlace(targetPlace as kakao.maps.services.PlacesSearchResultItem);

  const handleDeleteClick = () => {
    if (!targetPlace) return;
    if (isEditingLog) removeEditPlace(targetPlace as PlaceInLog);
    else removeRegisterPlace(targetPlace as kakao.maps.services.PlacesSearchResultItem);
    closeModal();
  };

  return (
    <Drawer.Root open={isOpen}>
      <Drawer.Portal>
        <Drawer.Content
          data-testid="content"
          className="z-50 fixed flex flex-col bg-black border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-20 max-w-[724px] mx-auto"
        >
          <DrawerTitle className="hidden">로그 작성 내 장소 순서 변경 및 삭제 Drawer</DrawerTitle>
          <DialogDescription className="hidden">
            로그 작성 내 장소 순서 변경 및 삭제
          </DialogDescription>

          <div className="grid grid-cols-3">
            <Button onClick={handleUpClick}>
              <ArrowUp />
              위로
            </Button>
            <Button onClick={handleDownClick}>
              <ArrowDown />
              아래로
            </Button>
            <Button onClick={handleDeleteClick}>
              <Trash />
              삭제하기
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ModifyDrawer;
