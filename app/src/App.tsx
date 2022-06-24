import React, { useEffect, useState } from 'react';
import api from './utils/api';
import { Map } from './components/Map';
import MapData from './map.json';


interface IResponse {
  UpdateTime: string
  Data: IReport
}

interface IReport {
  [pokrajina: string]: IStatus
}

interface IStatus {
  Date: string,
  Status: number
}

export const App = (() => {
  const [pokrajine, setPokrajine] = useState<IReport>({});
  const [updateTime, setUpdateTime] = useState("");

  useEffect(() => {
    api.get<IResponse>("/api/status")
      .then(response => {
        setPokrajine(response.data.Data);
        setUpdateTime(response.data.UpdateTime)
      })
  }, []);

  const demo = () => {
    const mapData: { [index: string]: string | undefined } = {...MapData};
    delete mapData["SLOVENIJA"];
    const demoData: IReport = {};
    Object.keys(mapData).forEach(pokrajina => {
      const status: IStatus = { Date: "", Status: Math.floor(Math.random() * 4) };
      demoData[pokrajina] = status
    })
    setPokrajine(demoData);
  }

  return (
    <div className='container mx-auto'>
      <div className='mx-auto relative'>
        <h1 className="antialiased text-6xl font-bold text-text m-10 text-center lg:text-left lg:absolute lg:top-4 lg:left-20">Toča INFO</h1>
        <div className='mx-10 mb-10 lg:px-10 lg:my-10'>
          <Map data={pokrajine} />
        </div>
        <div className='mx-2 antialiased text-sm text-center text-text-second lg:text-left lg:text-base lg:absolute lg:bottom-10 lg:right-0 lg:max-w-sm'>
          <p className='mb-3'>Barve označujejo verjetnost, da se ob prikazanem času na obarvanih lokacijah pojavlja toča:</p>
          <div className='flex flex-row gap-x-5 mb-3 text-center font-bold'>
            <div className='flex-col basis-full'>
              <div className='h-10 border-4 border-solid rounded border-map-border bg-low'></div>
              <div>Zaznavna</div>
            </div>
            <div className='flex-col basis-full'>
              <div className='h-10 border-4 border-solid rounded border-map-border bg-medium'></div>
              <div>Srednja</div>
            </div>
            <div className='flex-col basis-full'>
              <div className='h-10 border-4 border-solid rounded border-map-border bg-high'></div>
              <div>Velika</div>
            </div>
          </div>
          <p className='mb-3'>Prikazi so izdelani na podlagi trenutnih podatkov meteoroloških radarjev in so odvisne od razpoložljivosti radarskih meritev državne mreže meteoroloških postaj.</p>
          <p>Vir: <a href='https://meteo.arso.gov.si/met/sl/warning/hail/'>ARSO</a></p>
          <button onClick={demo} className='border-text-second p-2 border rounded-lg border-solid'>Demo</button>
        </div>
      </div>
      <div className='text-center text-text-footer fixed bottom-0 left-0 right-0'>
        {
          updateTime ? `Posodobljeno: ${new Date(updateTime).toLocaleString("sl-SI")}` : ""
        }
      </div>
    </div>
  );
});
