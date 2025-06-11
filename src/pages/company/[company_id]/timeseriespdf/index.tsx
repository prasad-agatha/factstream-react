import React from 'react';
// Hooks
import {useRequest} from 'src/lib/hooks';
// router
import {withRouter} from 'react-router-dom';
import useSWR from 'swr';
// endpoints
import {COMPANIES_DETAIL} from 'src/lib/constants/endpoints';
// services
import StorageService from 'src/services/StorageService';
// loadash
import _ from 'lodash';
// componenet
import {PdfViewer, HighlightExample} from 'src/components/elements';
// material UI
import {Box, Grid, Typography, Divider} from '@material-ui/core';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
// router
import {useParams} from 'react-router-dom';
// react bootstrap
import {Row, Col, Nav, Tabs, Tab} from 'react-bootstrap';

function Timeseriespdf({router}) {
  const [annotation, SetAnnotation] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(undefined);
  const storageService = new StorageService();

  const getStorageInfo = () => {
    const data = storageService.getItem('timeseriesannotate');
    setActiveTab(data.parseddata.documentid);
    SetAnnotation(data);
  };

  const {company_id, document_id} = useParams();
  const {data: company_detail}: any = useRequest({
    url: COMPANIES_DETAIL(company_id),
  });

  const getDocumentIds = () => {
    const data = storageService.getItem('documentId');
    return data;
  };

  React.useEffect(() => {
    window.addEventListener('storage', getStorageInfo);
  }, []);

  if (!company_detail) {
    return <>loading...</>;
  }
  const {documentid} = company_detail;

  const tab_headers = _.sortBy(
    _.intersectionWith(
      documentid,
      getDocumentIds(),

      ({documentid}, value) => value === documentid
    ),
    (item) => item.period.periodname.substring(0, 4)
  );

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
        </div>
        <div className="pt-4 pb-4">
          <Grid container className="contentBox">
            <Tab.Container
              id="left-tabs-example"
              activeKey={activeTab}
              defaultActiveKey={tab_headers[0].documentid}
              onSelect={setActiveTab}
            >
              <Row className="tab-container">
                <Col sm={12} className="mb-2 mt-2">
                  <Nav variant="pills" className="nav-tabList">
                    {_.map(tab_headers, (item, index) => {
                      return (
                        <Nav.Item key={index}>
                          <Nav.Link eventKey={item.documentid}>{item.period.periodname}</Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav>
                </Col>
                <Col sm={12} className="mb-2">
                  <Tab.Content>
                    {_.map(tab_headers, (item, index) => {
                      return (
                        <Tab.Pane eventKey={item.documentid} key={index}>
                          <div
                            style={{
                              height: '680px',
                              width: '800px',
                            }}
                          >
                            <HighlightExample
                              fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${item.filedisplayname}`}
                              annotationData={annotation}
                            />
                          </div>
                        </Tab.Pane>
                      );
                    })}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Grid>
        </div>
      </Box>
    </>
  );
}
export default withRouter(Timeseriespdf);
