const News = require("../model/News");
const axios = require("axios");
const cheerio = require("cheerio");

let URL = [
  {
    source:
      "http://www.pet-news.or.kr/news/articleList.html?sc_sub_section_code=S2N83&view_type=sm",
    list: "#user-section .type2 li a",
    headURL: "http://www.pet-news.or.kr",
    title: ".wrapper .heading",
    content: "#articleViewCon .article-body p",
    description: "#articleViewCon .article-body .subheading",
  },
  {
    source: "https://www.olchiolchi.com/category/animals-life/",
    list: ".et_pb_section et_pb_section_1_tb_body et_section_regular",
    headURL: "https://www.olchiolchi.com",
    title:
      ".et_pb_column et_pb_column_4_4 et_pb_column_inner et_pb_column_inner_0_tb_body et-last-child .entry-title",
    content: ".et_pb_module et_pb_post_content et_pb_post_content_0_tb_body p",
    description: "",
  },
  {
    source:
      "https://www.hani.co.kr/arti/animalpeople/companion_animal/home01.html",
    list: ".section-list-area a",
    headURL: "https://www.hani.co.kr",
    title: "#contents-article .title",
    content: ".article-text .text",
    description: ".article-text .subtitle br",
  },
];

const getHTML = async (link) => {
  try {
    return axios.get(`${link}`);
  } catch (err) {
    console.log(err);
  }
};

const getLink = async (sourceNumber) => {
  try {
    const html = await getHTML(URL[sourceNumber].source);
    const $ = cheerio.load(html.data);

    const contentList = $(URL[sourceNumber].list);

    let linkList = [];

    contentList.each((idx, elem) => {
      linkList.push(
        (URL[sourceNumber].headURL + $(elem).attr("href")).toString()
      );
    });

    // linkList.forEach((item) => console.log(item));
    return linkList;
  } catch (err) {
    console.log(err);
  }
};

const getData = async (sourceNumber, link) => {
  try {
    const html = await getHTML(link);

    const $ = cheerio.load(html.data);

    let title = "";
    let cont = "";
    let desc = "";

    title = $(URL[sourceNumber].title).text();
    cont = $(URL[sourceNumber].content).text();
    desc = $(URL[sourceNumber].description).text();

    const result = await News.create({
      newsTitle: title,
      newsContent: cont,
      newsDescription: desc,
    });
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const crawler = async () => {
  const result = await News.deleteMany();
  let linkList = [];
  linkList = await getLink(0);
  linkList.forEach((item) => getData(0, item));
};

module.exports = crawler;
