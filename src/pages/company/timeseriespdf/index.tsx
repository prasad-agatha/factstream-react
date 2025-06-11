import React from 'react';
// Hooks
import {useRequest} from 'src/lib/hooks';

import {withRouter} from 'react-router-dom';

import useSWR from 'swr';
// endpoints
import {COMPANIES_DETAIL} from 'src/lib/constants/endpoints';
// services
import StorageService from 'src/services/StorageService';
import {APIFetcher} from 'src/lib/service';
// loadash
import _ from 'lodash';
// componenet
import {PdfViewer} from 'src/components/elements';
// material UI
import {Box, Grid, Tab, Typography, Divider} from '@material-ui/core';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';

function PdfAnnotate({router}) {
  const [companyDocs, setCompanyDocs] = React.useState([]);
  const [companyInfo, setCompanyInfo] = React.useState();
  const [pdfTab, setpdfTab] = React.useState();
  const [annotation, SetAnnotation] = React.useState(null);
  const storageService = new StorageService();

  const handlePdf = (event: any, newValue: any) => {
    storageService.removeItem('timeseriesannotate');
    setpdfTab(newValue);
  };

  const getCompanyId = () => {
    const data = storageService.getItem('companyId');
    // console.log(data);

    return data;
  };
  const getDocumentIds = () => {
    const data = storageService.getItem('documentId');
    return data;
  };
  const {company_id} = router.query;

  const {data: company_detail}: any = useRequest({
    url: COMPANIES_DETAIL(company_id),
  });
  const getStorageInfo = () => {
    const data = storageService.getItem('timeseriesannotate');

    if (data && data.parseddata) {
      SetAnnotation(data);

      // if (pdfTab !== data.parseddata.documentid) {
      setpdfTab(data.parseddata.documentid);

      // setTimeout(() => {
      //   SetAnnotation(data);
      // }, 3000);
      // }
    }
  };

  useSWR('/', getStorageInfo, {
    refreshInterval: 3000,
  });

  React.useEffect(() => {
    window.addEventListener('storage', getStorageInfo);
    window.addEventListener('storage', getCompanyId);
  }, []);

  React.useEffect(() => {
    APIFetcher(COMPANIES_DETAIL(getCompanyId())).then((res) => {
      setCompanyDocs(res.documentid);
      setCompanyInfo(res);
      //   console.log(res);
    });
  });

  const pdfFile =
    companyDocs.length > 0 && getDocumentIds().length > 0
      ? companyDocs.filter((item) => {
          return getDocumentIds().includes(item.documentid);
        })
      : companyDocs;

  const tab_headers = _.sortBy(pdfFile, [
    (o) => {
      return o.period.periodname.substring(0, 4);
    },
  ]);

  React.useEffect(() => {
    if (!getDocumentIds().includes(pdfTab) && tab_headers.length > 0) {
      setpdfTab(tab_headers[0].documentid);
    }
    if (!pdfTab && tab_headers.length > 0) {
      setpdfTab(tab_headers[0].documentid);
    }
  }, [company_detail]);

  //   if (!company_detail) {
  //     return <>loading...</>;
  //   }

  return (
    <>
      <Box mb={4}>
        <div>
          <Box className="headerTop">
            <Box>
              <Typography className="companyHeading">
                <span style={{fontWeight: 400}}>{companyInfo} </span>
              </Typography>
            </Box>
          </Box>
          <Divider />
        </div>
        <div className="pt-4 pb-4">
          <Grid className="contentBox">
            <Box id="pdfcontainer">
              <Grid style={{border: '1px solid #ADCDF0', paddingTop: '10px', background: '#fff'}}>
                {tab_headers.length == 0 ? (
                  <Typography align="center">Oops! no Pdf available</Typography>
                ) : (
                  <TabContext value={`${pdfTab}`}>
                    <TabList
                      onChange={handlePdf}
                      aria-label="simple tabs"
                      className="tabview"
                      TabIndicatorProps={{style: {background: 'transparent'}}}
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      {_.map(tab_headers, (item, index) => {
                        return (
                          <Tab
                            className="tabList"
                            label={item.period.periodname}
                            value={`${item.documentid}`}
                            key={index}
                          />
                        );
                      })}
                    </TabList>
                    {_.map(tab_headers, (item, index) => {
                      return (
                        <TabPanel value={`${item.documentid}`} style={{padding: '0'}} key={index}>
                          <Grid className="pdfWrapper">
                            {annotation ? (
                              <PdfViewer
                                fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${item.filedisplayname}`}
                                annotationData={annotation}
                              />
                            ) : (
                              <PdfViewer
                                fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${item.filedisplayname}`}
                              />
                            )}
                          </Grid>
                        </TabPanel>
                      );
                    })}
                  </TabContext>
                )}
              </Grid>
            </Box>
          </Grid>
        </div>
      </Box>
    </>
  );
}
export default withRouter(PdfAnnotate);
