import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Sheet } from '@/types';
import SheetCard from '@/shared/SheetCard';
import Loading from '@/shared/Loading';
import Panel from '@/shared/Panel';
import { getRecommendResource } from './service';
import './PersonalRecommendation.less';

function PersonalRecommendation() {
  const history = useHistory();
  const [resource, setResource] = useState<Sheet[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async function update() {
      try {
        setLoading(true);
        const res = await getRecommendResource();
        setResource(res);
      } catch (e) {
        //
      }
      setLoading(false);
    })();
  }, []);
  const handleClickSheetCard = (id: string) => {
    history.push(`/music_sheet?type=common_sheet&id=${id}`);
  };
  if (loading) return <Loading />;
  return (
    <div className="personal-rcmd-container">
      <div className="page-content-container">
        <Panel title="推荐歌单">
          {resource.map(({ id, name, picUrl, playCount }) => (
            <SheetCard
              key={id}
              desc={name}
              picUrl={picUrl}
              playcount={playCount}
              onClick={() => handleClickSheetCard(id)}
            />
          ))}
        </Panel>
      </div>
    </div>
  );
}

export default PersonalRecommendation;
