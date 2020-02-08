import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Layout } from "../../components/Layout/Layout";
import { Form, Row, Col, Typography, Statistic, Result } from "antd";
import { SelectAA } from "../../components/SelectAA/SelectAA";
import { LoanListByAddress } from "../../components/LoanListByAddress/LoanListByAddress";
import { IssueStablecoinFrom, UserForm } from "../../forms";
import { useSelector } from "react-redux";
import { IssueAsset } from "../../components/IssueAsset/IssueAsset";
import { ParamsView } from "../../components/ParamsView/ParamsView";

const { Title } = Typography;
const { Countdown } = Statistic;

export const HomePage = props => {
  const { t } = useTranslation();
  const active = useSelector(state => state.aa.active);
  const activeParams = useSelector(state => state.aa.activeParams);
  const activeInfo = useSelector(state => state.aa.activeInfo);
  const activeDataFeedMa = useSelector(state => state.aa.activeDataFeedMa);
  const activeDataFeed = useSelector(state => state.aa.activeDataFeed);
  const activeAssetRequest = useSelector(state => state.aa.activeAssetRequest);
  const [address, setAddress] = useState("");
  const finish = () => {};
  let screen = "";
  if (active) {
    if (
      !(
        activeDataFeed &&
        activeDataFeed !== "none" &&
        activeDataFeedMa &&
        activeDataFeedMa !== "none"
      )
    ) {
      screen = "data_feed";
    } else if (!("asset" in activeInfo || activeAssetRequest)) {
      screen = "asset";
    } else {
      screen = "home";
    }
  }

  return (
    <Layout title={t("pages.home.title")} page="home">
      <Row style={{ marginBottom: 25 }}>
        <SelectAA autoFocus={true} />
        {active && <ParamsView />}
      </Row>
      {screen && screen === "home" && (
        <>
          <Row style={{ marginBottom: 25 }}>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <IssueStablecoinFrom />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 14, offset: 2 }}>
              <Title level={3}>Statistics</Title>
              <Row type="flex">
                {activeParams && activeParams.expiry_date && (
                  <Col>
                    <div style={{ textAlign: "center", marginRight: 15 }}>
                      <Countdown
                        title="Days to expiration"
                        format={"DD"}
                        value={moment(activeParams.expiry_date)}
                        onFinish={finish}
                      />
                    </div>
                  </Col>
                )}
                {activeInfo && "circulating_supply" in activeInfo && (
                  <Col>
                    <div style={{ textAlign: "center" }}>
                      <Statistic
                        title="Total coins"
                        value={activeInfo.circulating_supply}
                      />
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
          <Row style={{ marginBottom: 25 }}>
            <UserForm onChange={address => setAddress(address)} />
            <Row>
              {address && (
                <LoanListByAddress address={address} active={active} />
              )}
            </Row>
          </Row>
        </>
      )}
      {screen && screen === "data_feed" && (
        <Result status="warning" title="The oracle is not responding " />
      )}
      {screen && screen === "asset" && <IssueAsset />}
    </Layout>
  );
};
