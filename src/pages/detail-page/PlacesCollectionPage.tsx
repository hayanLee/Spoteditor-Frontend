import ModalLogCard from '@/components/LogCard/ModalLogCard';
import useLog from '@/hooks/queries/log/useLog';
import usePlaceBookMark from '@/hooks/queries/log/usePlaceBookMark';
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { X } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PlacesCollectionPage = () => {
  const navi = useNavigate();
  const { placeLogId } = useParams();
  const { data: logData } = useLog(Number(placeLogId));
  const { data: placeBookmark } = usePlaceBookMark(Number(placeLogId));

  const places = logData?.places ?? [];
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between py-3">
        <h3 className="text-text-2xl font-bold">소개된 장소</h3>
        <Link to={`/log/${placeLogId}`}>
          <X onClick={() => navi(-1)} />
        </Link>
      </div>

      <div className="py-[18px] grid grid-cols-3 gap-x-[5px] gap-y-5">
        {places.map((place: PlaceInLog, idx) => (
          <ModalLogCard
            key={place.placeId}
            place={place}
            isPlaceBookMark={placeBookmark?.[idx]?.isBookmarked}
            placeLogId={Number(logData?.placeLogId)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlacesCollectionPage;
