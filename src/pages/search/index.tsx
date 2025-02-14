import SectionHeader from '@/components/Header/SectionHeader';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomPagination from '@/components/CustomPagination';
import PageLayout from '@/layouts/PageLayout';

function Search() {
  const location = useLocation();
  const nav = useNavigate();
  const title = location.state?.title || '';

  useEffect(() => {
    if (!title) {
      nav('/');
    }
  }, [title, nav]);
  return (
    <PageLayout className="web:gap-[50px]">
      <SectionHeader labelText="Searching for" queryText={title} bottomLine />
      <SectionHeader labelText="Sort by" queryText="Popularity" />
      {/* <SearchNotFound /> */}
      <div className="w-full h-[1524px] ">
        <div className="flex w-[156px] flex-col gap-4 mb-12">
          <div className="font-untitled text-2xl h-[23px] text-[#ABAFB5]">Sort by</div>
          <div className="font-untitled text-2xl h-[23px] text-[#242528]">Log</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2  h-[1328px] flex flex-wrap">
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
          </div>
          <div className="w-1/2  h-[1328px] flex flex-wrap">
            <div className="w-[664px] mr-5 mb-6">
              <div className="w-full h-[550px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
            <div className="w-[314px] mr-5">
              <div className="w-full h-[218px] bg-red-100 mb-2"></div>
              <div className="w-full font-bold text-black font-pretendard text-16">
                혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페
              </div>
              <div className="w-full font-pretendard text-text-xl font-normal text-[#ABAFB5]">
                서울 | 위치 세부정보
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomPagination current={2} total={12} />
    </PageLayout>
  );
}

export default Search;
