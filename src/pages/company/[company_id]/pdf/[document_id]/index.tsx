import React, {FC} from 'react';
// Hooks
import {useRequest} from 'src/lib/hooks';
// router
import {useRouter} from 'react-router-dom';
// endpoints
import {COMPANIES_DETAIL} from 'src/lib/constants/endpoints';
// services
import StorageService from 'src/services/StorageService';
// componenet
import {PdfViewer} from 'src/components/elements';
// material UI
import {Box, Grid, Tab, Typography, Divider} from '@material-ui/core';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';

const PdfAnnotate: FC = () => {
  const [period, setPeriod] = React.useState();
  const [pdfvalue, setPdfvalue] = React.useState('1');
  const [annotation, SetAnnotation] = React.useState(null);
  const storageService = new StorageService();
  const router = useRouter();
  const {company_id} = router.query;
  const {document_id} = router.query;
  const {data: company_detail}: any = useRequest({
    url: COMPANIES_DETAIL(company_id),
  });

  const handlePdf = (event: any, newValue: any) => {
    setPdfvalue(newValue);
  };
  const getStorageInfo = () => {
    const data = storageService.getItem('annotate');
    SetAnnotation(data);
  };
  const period_name = () => {
    const pdfFile = company_detail.documentid.filter((item: any) => item.documentid == document_id);
    return pdfFile[0].period.periodname;
  };

  React.useEffect(() => {
    window.addEventListener('storage', getStorageInfo);
  }, []);

  React.useEffect(() => {
    if (company_detail) {
      setPeriod(period_name());
    }
  }, [company_detail]);

  const pdfFile =
    company_detail &&
    company_detail.documentid.filter((item: any) => item.documentid == document_id);

  if (!company_detail) {
    return <>loading...</>;
  }
  const pdfPath = pdfFile[0].filereceivedname;

  return (
    <>
      <Box mb={4}>
        <div>
          <Box className="headerTop">
            <Box>
              <Typography className="companyHeading">
                <span style={{fontWeight: 400}}>{company_detail && company_detail.name} </span>
              </Typography>
            </Box>
          </Box>
          <Divider />

          <Grid className="content-box">
            <Box style={{width: '100%', height: '100%'}}>
              <Grid style={{border: '1px solid #ADCDF0', paddingTop: '10px', background: '#fff'}}>
                <TabContext value={pdfvalue}>
                  <TabList
                    onChange={handlePdf}
                    aria-label="simple tabs"
                    className="tabview"
                    TabIndicatorProps={{style: {background: 'transparent'}}}
                  >
                    <Tab className="tabList" label={period && period} value="1" />
                  </TabList>
                  <TabPanel value="1" style={{padding: '0'}}>
                    <Box className="">
                      {annotation ? (
                        <PdfViewer
                          fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${pdfPath}`}
                          annotationData={annotation}
                        />
                      ) : (
                        <PdfViewer
                          fileUrl={`https://libero-notes.s3.ap-south-1.amazonaws.com/factstream/${pdfPath}`}
                        />
                      )}
                    </Box>
                  </TabPanel>
                </TabContext>
              </Grid>
            </Box>
          </Grid>
        </div>
      </Box>
    </>
  );
};
export default PdfAnnotate;
