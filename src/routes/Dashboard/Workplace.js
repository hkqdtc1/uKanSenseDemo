import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';

import styles from './Workplace.less';

const links = [
  {
    title: '报销',
    href: '',
  },
  {
    title: '请假',
    href: '',
  },
  {
    title: '离职',
    href: '',
  },
  {
    title: '咨询',
    href: '',
  },
  {
    title: '购买',
    href: '',
  },
  {
    title: '其他操作',
    href: '',
  },
];

const members = [
  {
    id: 'members-1',
    title: '姓名：曲丽丽',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/keeYtvRpGFVVKOOiOZDS.png',
    link: '',
  },
  {
    id: 'members-2',
    title: '年龄：49岁',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/HpGtMMahFSHCFrLHoRgp.png',
    link: '',
  },
  {
    id: 'members-3',
    title: '职位：管理员',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/vbkXPXkeyhWWEQKpTmyB.png',
    link: '',
  },
  {
    id: 'members-4',
    title: '性别：女',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/UXeAaBwlPaPqIVOjMqpK.png',
    link: '',
  },
  {
    id: 'members-5',
    title: '联系电话：181-xxxx-xxxx',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/lPPRIxHBXYiVglbTqzUM.png',
    link: '',
  },
  {
    id: 'members-6',
    title: '紧急联系人：186-xxxx-xxxx',
    link: '',
  },
  {
    id: 'members-7',
    title: '卧床：否',
    link: '',
  },
  {
    id: 'members-8',
    title: '失能失智：否',
    link: '',
  },
  {
    id: 'members-9',
    title: '当前位置：308房间',
    link: '',
  },
  {
    id: 'members-10',
    title: '陪护护工：张翠花',
    link: '',
  },
  {
    id: 'members-11',
    title: '电子病历',
    link: '',
  },
];

@connect(state => ({
  project: state.project,
  activities: state.activities,
  chart: state.chart,
}))
export default class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map((item) => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
        if (item[key]) {
          return <a href={item[key].link} key={item[key].name}>{item[key].name}</a>;
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      project: { loading: projectLoading, notice },
      activities: { loading: activitiesLoading },
      chart: { radarData },
    } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/keeYtvRpGFVVKOOiOZDS.png" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>早安，曲丽丽，祝你开心每一天！</div>
          <div>老年公寓管理员 | 宿迁红枫老年公寓</div>
        </div>
      </div>
    );

    const pageHeaderExtra = (
      <div className={styles.pageHeaderExtra}>
        <div>
          <p>当前任务</p>
          <p>56</p>
        </div>
        <div>
          <p>任务完数排名</p>
          <p>8<span> / 24</span></p>
        </div>
        <div>
          <p>已完成任务数</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
        extraContent={pageHeaderExtra}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {
                notice.map(item => (
                  <Card.Grid className={styles.projectGrid} key={item.id}>
                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                      <Card.Meta
                        title={(
                          <div className={styles.cardTitle}>
                            <Avatar size="small" src={item.logo} />
                            <Link to={item.href}>{item.title}</Link>
                          </div>
                        )}
                        description={item.description}
                      />
                      <div className={styles.projectItemContent}>
                        <Link to={item.memberLink}>{item.member || ''}</Link>
                        {item.updatedAt && (
                          <span className={styles.datetime} title={item.updatedAt}>
                            {moment(item.updatedAt).fromNow()}
                          </span>
                        )}
                      </div>
                    </Card>
                  </Card.Grid>
                ))
              }
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>
                  {this.renderActivities()}
                </div>
              </List>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速操作"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup
                onAdd={() => {}}
                links={links}
                linkElement={Link}
              />
            </Card>
            {/*
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="XX 指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            */}
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="个人信息"
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {
                    members.map(item => (
                      <Col span={24} key={`members-item-${item.id}`}>
                        <Link to={item.link}>
                          <Avatar src={item.logo} size="small" />
                          <span className={styles.member}>{item.title}</span>
                        </Link>
                      </Col>
                    ))
                  }
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
