import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Sheet } from '@/types';
import SheetCard from '@/shared/SheetCard';
import { getRecommendResource } from './service';
import './PersonalRecommendation.less';

function PersonalRecommendation() {
  const history = useHistory();
  const [resource, setResource] = useState<Sheet[]>([]);
  useEffect(() => {
    (async function update() {
      try {
        const res = await getRecommendResource();
        setResource(res);
      } catch (e) {
        //
      }
    })();
  }, []);
  const handleClickSheetCard = (id: string) => {
    history.push(`/music_sheet?type=common_sheet&id=${id}`);
  };
  return (
    <div className="personal-rcmd-container">
      {resource.map(({ id, name, picUrl, playCount }) => (
        <SheetCard
          key={id}
          desc={name}
          picUrl={picUrl}
          playcount={playCount}
          onClick={() => handleClickSheetCard(id)}
        />
      ))}
    </div>
  );
}

export default PersonalRecommendation;
