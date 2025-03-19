import ModalLogCard from '@/components/LogCard/ModalLogCard';
import useLog from '@/hooks/queries/log/useLog';
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const PlacesCollectionPage = () => {
  const navi = useNavigate();
  const { placeLogId } = useParams();
  const { data } = useLog(Number(placeLogId));
  const places = data?.places ?? [];

  return (
    <div className="px-4">
      <div className="flex items-center justify-between py-3">
        <h3 className="text-text-2xl font-bold">소개된 장소</h3>
        <X onClick={() => navi(-1)} />
      </div>

      <div className="py-[18px] grid grid-cols-3 gap-x-[5px] gap-y-5">
        {places.map((place: PlaceInLog) => (
          <ModalLogCard key={place.placeId} place={place} placeLogId={Number(placeLogId)} />
        ))}
      </div>
    </div>
  );
};

export default PlacesCollectionPage;
