import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import '../styles/pages/list-orphanages.css';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { FiInfo } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

interface Orphanage{
  id: number;
  name: string;
  wppNumber: string;
}

function ListOrphanages() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, [])

  return(
    <div id="page-list">
      <Sidebar />

      <main>
        <div className="list-orphanages">
          <fieldset>
            <legend>{orphanages.length} orfanatos encontrados</legend>

            {orphanages.map(orphanage => {
              return(
                <div className="orphanage-details-content">
                  <h2 className="text-orphanages">{orphanage.name}
                    <Link to={`/orphanages/${orphanage.id}`} className="fi-icon">
                      <FiInfo size={30} color="#fff">
                      </FiInfo>
                    </Link>

                    <a target="_blank" href={`https://api.whatsapp.com/send?phone=${orphanage.wppNumber}`} className="wpp-icon">
                      <FaWhatsapp size={30} color="#FFF" />
                    </a>
                  </h2>
                </div>
              );
            })}
            
          </fieldset>
        </div>
      </main>
    </div>
  );
}

export default ListOrphanages;