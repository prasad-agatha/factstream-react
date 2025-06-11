import React, {FC} from 'react';
// Hooks
import {useRequest} from 'src/lib/hooks';
import useSWR from 'swr';
// endpoints
import {COMPANIES_DETAIL} from 'src/lib/constants/endpoints';
// services
import StorageService from 'src/services/StorageService';
// componenet
import {HighlightExample} from 'src/components/elements';
// material UI
import {Box, Grid, Typography, Divider} from '@material-ui/core';
// router
import {useParams} from 'react-router-dom';
// lodash
import _ from 'lodash';
// react bootstrap
import {Row, Col, Nav, Tabs, Tab} from 'react-bootstrap';

const NormaliedPdf: FC = () => {
  const [annotation, SetAnnotation] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(undefined);
  const storageService = new StorageService();

  const getStorageInfo = () => {
    const data = storageService.getItem('normaliseannotate');
    SetAnnotation(data);
  };

  const {company_id, document_id} = useParams();
  const {data: company_detail}: any = useRequest({
    url: COMPANIES_DETAIL(company_id),
  });

  // useSWR('/', getStorageInfo, {
  //   refreshInterval: 3000,
  // });

  React.useEffect(() => {
    window.addEventListener('storage', getStorageInfo);
  }, []);

  if (!company_detail || !document_id) {
    return <>loading...</>;
  }

  const pdfFile = _.find(company_detail.documentid, ['documentid', parseInt(document_id)]);

  return (
    <>
      <Box mb={4}>
        <div>
          <Box className="headerTop">
            <Box>
              <Typography className="companyHeading">
                <span style={{fontWeight: 400}}>{company_detail?.name} </span>
              </Typography>
            </Box>
          </Box>
          <Divider />

          <Grid className="content-box">
            <Tab.Container
              id="left-tabs-example"
              activeKey={activeTab}
              defaultActiveKey={pdfFile.period.periodname}
              onSelect={setActiveTab}
            >
              <Row className="tab-container">
                <Col sm={12} className="mb-2 mt-2">
                  <Nav variant="pills" className="nav-tabList">
                    <Nav.Item>
                      <Nav.Link eventKey={pdfFile.period.periodname}>
                        {pdfFile.period.periodname}
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={12} className="mb-2">
                  <Tab.Content>
                    <Tab.Pane eventKey={pdfFile.period.periodname}>
                      <div
                        style={{
                          height: '680px',
                          width: '800px',
                        }}
                      >
                        <HighlightExample
                          fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${pdfFile.filedisplayname}`}
                          annotationData={annotation}
                        />
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Grid>
        </div>
      </Box>
    </>
  );
};
export default NormaliedPdf;
