import React, { useState, useEffect } from "react";
import { Alert, Dropdown } from "react-bootstrap";
import * as api from './utils/apiUtils';
import {getAccessibleResources} from './utils/authUtils'



const SitePicker = () => {

  const [sites, setSites] = useState([]);
  const [site, setSite] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const authToken = await api.getNewestAuthToken();
        const {accessToken} = authToken;

        const resources = await getAccessibleResources(accessToken);
        setSites(resources);
      }catch(error) {
        alert(error.message);
      }
    };

    fetchData();
  }, []);

  const onSelectSite = site => {
    setSite(site);
  }

  return (
    <div>
      <Alert variant="warning">
        You need to select a site to make requests to
      </Alert>

      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {site ? site.name: `Select a Site (${sites.length})`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            sites.map(site => 
              <Dropdown.Item key={site.id} onClick={() => { onSelectSite(site)}}>{site.name}</Dropdown.Item>
            )
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SitePicker;