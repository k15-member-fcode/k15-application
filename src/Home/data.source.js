import React from 'react';
import socialLogo from './social.png';
export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper jzih1dpqqrg-editor_css' },
  page: { className: 'home-page' },
  logo: {
    className: 'header3-logo jzjgnya1gmn-editor_css',
    children:
      'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*-J8NSLj9rbsAAAAAAAAAAABkARQnAQ',
  },
  Menu: {
    className: 'header3-menu',
    children: [
      {
        name: 'item1',
        className: 'header3-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <>
                  <p>订订群</p>
                </>
              ),
              name: 'text',
            },
          ],
        },
        subItem: [
          {
            className: 'item-sub',
            children: {
              className: 'item-sub-item jzj8295azrs-editor_css',
              children: [
                {
                  name: 'image0',
                  className: 'item-image jzj81c9wabh-editor_css',
                  children:
                    'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*4_S6ToPfj-QAAAAAAAAAAABkARQnAQ',
                },
              ],
            },
            name: 'sub~jzj8hceysgj',
          },
        ],
      },
      {
        name: 'item2',
        className: 'header3-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <>
                  <p>帮助中心</p>
                </>
              ),
              name: 'text',
            },
          ],
        },
      },
    ],
  },
  mobileMenu: { className: 'header3-mobile-menu' },
};
export const Nav00DataSource = {
  wrapper: { className: 'header0 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header0-logo',
    children: './logo.png',
  },
  Menu: {
    className: 'header0-menu',
    children: [
      {
        name: 'item0',
        className: 'header0-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <>
                  <p>Trang chủ</p>
                </>
              ),
              name: 'text',
            },
          ],
        },
      },
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <>
                  <p>Giới thiệu</p>
                </>
              ),
              name: 'text',
            },
          ],
        },
      },
      {
        name: 'item2',
        className: 'header0-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <>
                  <p>Top Q&A</p>
                </>
              ),
              name: 'text',
            },
          ],
        },
      },
    ],
  },
  mobileMenu: { className: 'header0-mobile-menu' },
};
export const Banner00DataSource = {
  wrapper: { className: 'banner0' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title',
    children: [<p>Welcom K15</p>, <p>to</p>, <p>F-Code</p>],
  },
  content: {
    className: 'banner0-content',
    children: (
      <>
        <p>Apply to F-Code now!</p>
      </>
    ),
  },
  button: {
    className: 'banner0-button',
    children: (
      <>
        <p>Sign up with Google</p>
      </>
    ),
  },
};
export const Feature30DataSource = {
  wrapper: { className: 'home-page-wrapper content3-wrapper' },
  page: { className: 'home-page content3' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <>
            <p>Giới thiệu</p>
          </>
        ),
        className: 'title-h1',
      },
      {
        name: 'content',
        className: 'title-content',
        children: (
          <>
            <p>Vì sao chúng tôi tuyển bạn?</p>
          </>
        ),
      },
    ],
  },
  block: {
    className: 'content3-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://image.flaticon.com/icons/svg/599/599502.svg',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '' },
          content: {
            className: 'content3-content',
            children:
              'Chia sẻ niềm đam mê về lập trình: CLB tìm kiếm các bạn thành viên có tinh thần học hỏi, nhiệt huyết, cống hiến hết mình vì học thuật',
          },
        },
      },
      {
        name: 'block1',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              socialLogo,
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '' },
          content: {
            className: 'content3-content',
            children:
              'Tạo sân chơi giao lưu và học hỏi: Các bạn sinh viên sẽ có nhiều cơ hội học tập và trau dồi kiến thức với các bạn đồng trang lứa cũng như các anh chị khóa trên.',
          },
        },
      },
      {
        name: 'block2',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://www.psionline.com/wp-content/uploads/skill-innovation.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '' },
          content: {
            className: 'content3-content',
            children:
              'Tạo cơ hội phát triển kỹ năng mềm: Ngoài lập trình, CLB còn tổ chức nhiều hoạt động ngoại khóa để rèn luyện tinh thần trách nhiệm và phát triển tư duy sáng tạo cho các bạn sinh viên.',
          },
        },
      }
    ],
  },
};
export const Feature60DataSource = {
  wrapper: { className: 'home-page-wrapper feature6-wrapper' },
  OverPack: { className: 'home-page feature6', playScale: 0.3 },
  Carousel: {
    className: 'feature6-content',
    dots: false,
    wrapper: { className: 'feature6-content-wrapper' },
    titleWrapper: {
      className: 'feature6-title-wrapper',
      barWrapper: {
        className: 'feature6-title-bar-wrapper k08vkm2c1g7-editor_css',
        children: { className: 'feature6-title-bar k08vkfrw6t-editor_css' },
      },
      title: { className: 'feature6-title' },
    },
    children: [
      {
        title: {
          className: 'feature6-title-text',
          children: (
            <>
              <p>About F-Code</p>
            </>
          ),
        },
        className: 'feature6-item',
        name: 'block0',
        children: [
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child0',
            number: {
              className: 'feature6-number',
              unit: {
                className: 'feature6-unit k08vkvxgkb-editor_css',
                children: '万',
              },
              children: (
                150
              ),
            },
            children: {
              className: 'feature6-text',
              children: (
                <>
                  <span>members</span>
                </>
              ),
            },
          },
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child1',
            number: {
              className: 'feature6-number',
              unit: {
                className: 'feature6-unit k08vlsban1b-editor_css',
                children: '亿',
              },
              children: (
                7
              ),
            },
            children: {
              className: 'feature6-text',
              children: (
                <>
                  <span>years</span>
                </>
              ),
            },
          },
          {
            md: 8,
            xs: 24,
            className: 'feature6-number-wrapper',
            name: 'child2',
            number: {
              className: 'feature6-number',
              unit: {
                className: 'feature6-unit k08vlwf7nrk-editor_css',
                children: '亿',
              },
              children: (
                10
              ),
            },
            children: {
              className: 'feature6-text',
              children: (
                <>
                  <span>contests/year</span>
                </>
              ),
            },
          },
        ],
      },
      {
        title: {
          className: 'feature6-title-text k08vk2qtfqp-editor_css',
          children: '服务指标',
        },
        className: 'feature6-item',
        name: 'block1',
        children: [
          {
            md: 8,
            xs: 24,
            name: 'child0',
            className: 'feature6-number-wrapper',
            number: {
              className: 'feature6-number',
              unit: { className: 'feature6-unit', children: '万' },
              children: '116',
            },
            children: { className: 'feature6-text', children: '模型数据' },
          },
          {
            md: 8,
            xs: 24,
            name: 'child1',
            className: 'feature6-number-wrapper',
            number: {
              className: 'feature6-number',
              unit: { className: 'feature6-unit', children: '亿' },
              children: '1.17',
            },
            children: { className: 'feature6-text', children: '模型迭代数量' },
          },
          {
            md: 8,
            xs: 24,
            name: 'child2',
            className: 'feature6-number-wrapper',
            number: {
              className: 'feature6-number',
              unit: { className: 'feature6-unit', children: '亿' },
              children: '2.10',
            },
            children: { className: 'feature6-text', children: '训练样本数量' },
          },
        ],
      },
    ],
  },
};
export const Content90DataSource = {
  wrapper: { className: 'home-page-wrapper content9-wrapper' },
  page: { className: 'home-page content9' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children:
          'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image',
      },
      {
        name: 'title',
        children: (
          <>
            <p>Top Q&amp;A</p>
          </>
        ),
        className: 'title-h1',
      },
    ],
  },
  block: {
    className: 'timeline',
    children: [
      {
        name: 'block0',
        className: 'block-wrapper k08voards38-editor_css',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper k08vnsi3xs-editor_css' },
          textWrapper: { className: 'text-wrapper k08vo7ch1wo-editor_css' },
          img: {
            className: 'block-img',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
          },
          icon: {
            className: 'block-icon',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/qJnGrvjXPxdKETlVSrbe.svg',
          },
          name: { className: 'block-name', children: '姓名' },
          post: { className: 'block-post', children: '公司 职位' },
          time: { className: 'block-time', children: '09:00 - 10:00' },
          title: { className: 'block-title', children: '开幕致辞' },
          content: { className: 'block-content', children: '' },
        },
      },
      {
        name: 'block1',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
          },
          icon: {
            className: 'block-icon',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/QviGtUPvTFxdhsTUAacr.svg',
          },
          name: {
            className: 'block-name',
            children: (
              <>
                <p>Name</p>
              </>
            ),
          },
          post: {
            className: 'block-post',
            children: (
              <>
                <p>Student ID</p>
              </>
            ),
          },
          time: {
            className: 'block-time',
            children: (
              <>
                <p>Time</p>
              </>
            ),
          },
          title: {
            className: 'block-title',
            children: (
              <>
                <p>Question</p>
              </>
            ),
          },
          content: {
            className: 'block-content',
            children: (
              <>
                <p>Answers</p>
              </>
            ),
          },
        },
      },
      {
        name: 'block2',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
          },
          icon: {
            className: 'block-icon',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/QviGtUPvTFxdhsTUAacr.svg',
          },
          name: { className: 'block-name', children: '姓名' },
          post: { className: 'block-post', children: '公司 职位' },
          time: { className: 'block-time', children: '09:00 - 10:00' },
          title: { className: 'block-title', children: '演示标题 - XYZ' },
          content: {
            className: 'block-content',
            children:
              '经过近 3 年的打磨，在助力中台产品研发效能提升的目标之上，包含设计语言、UI 资产、可视化以及产品体验相关的蚂蚁中台设计体系正在逐步成型。此次分享包含两部分，在介绍蚂蚁设计体系的同时，也会和大家分享我们在设计语言的部分探索。',
          },
        },
      },
      {
        name: 'block3',
        className: 'block-wrapper',
        playScale: 0.3,
        children: {
          imgWrapper: { className: 'image-wrapper' },
          textWrapper: { className: 'text-wrapper' },
          img: {
            className: 'block-img',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
          },
          icon: {
            className: 'block-icon',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/agOOBdKEIJlQhfeYhHJc.svg',
          },
          name: { className: 'block-name', children: '姓名' },
          post: { className: 'block-post', children: '公司 职位' },
          time: { className: 'block-time', children: '09:00 - 10:00' },
          title: { className: 'block-title', children: '演示标题 - XYZ' },
          content: {
            className: 'block-content',
            children:
              '经过近 3 年的打磨，在助力中台产品研发效能提升的目标之上，包含设计语言、UI 资产、可视化以及产品体验相关的蚂蚁中台设计体系正在逐步成型。此次分享包含两部分，在介绍蚂蚁设计体系的同时，也会和大家分享我们在设计语言的部分探索。',
          },
        },
      },
    ],
  },
};
export const Footer00DataSource = {
  wrapper: { className: 'home-page-wrapper footer0-wrapper' },
  OverPack: { className: 'home-page footer0', playScale: 0.05 },
  copyright: {
    className: 'copyright',
    children: (
      <>
        <span>
          ©2019 <a href="https://www.facebook.com/fcodefpt/" target="_blank" rel="noopener noreferrer">F-Code</a> All Rights
          Reserved
        </span>
      </>
    ),
  },
};
