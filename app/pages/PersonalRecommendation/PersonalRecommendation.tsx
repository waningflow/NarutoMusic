import React, { useState, useEffect } from 'react';
import { Sheet } from '@/types';
import SheetCard from '@/shared/SheetCard';
import { getRecommendResource } from './service';
import './PersonalRecommendation.less';

function PersonalRecommendation() {
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
  return (
    <div className="personal-rcmd-container">
      {resource.map(({ id, name, picUrl, playcount }) => (
        <SheetCard key={id} desc={name} picUrl={picUrl} playcount={playcount} />
      ))}
    </div>
  );
}

export default PersonalRecommendation;
