const News = require("../model/News");
const VideoNews = require("../model/VideoNews");
const AttachedFile = require("../model/AttachedFile");
const axios = require("axios");
const cheerio = require("cheerio");

let tag = {
  list: "",
  content: "#contents #newsct_article #dic_area",
  imgLink: "#contents #newsct_article #dic_area img",
  deleteTag: "#contents #newsct_article #dic_area .img_desc",
};

const removeEtc = async (str) => {
  let x = "";
  try {
    x = str.replace(/&#39;/g, "'");
    x = x.replace(/&apos;/g, "'");
    x = x.replace(/&#34;/g, '"');
    x = x.replace(/&quot;/g, '"');
    x = x.replace(/<b>/g, "");
    x = x.replace(/<\/b>/g, "");

    x = x.replace(/&nbsp;/g, " ");
    x = x.replace(/&lt;/g, "<");
    x = x.replace(/&gt;/g, ">");
    x = x.replace(/&amp;/g, "&");
    x = x.replace(/&#035;/g, "#");
    return x;
  } catch (err) {
    console.log(err);
  }
};

const getHTML = async (link) => {
  try {
    return axios.get(`${link}`);
  } catch (err) {
    console.log(err);
  }
};

const getData = async (newsItem) => {
  try {
    const html = await getHTML(newsItem.naverLink);

    const $ = cheerio.load(html.data);

    let contents = "";
    let getContent = "";

    const imgArray = [];

    $(tag.deleteTag).remove();

    getContent = $(tag.content).html().replace(/<br>/g, "\n");
    contents = $(getContent).text();

    // console.log(contents);

    $(tag.imgLink).each(function (item, index, array) {
      imgArray.push($(this).attr("data-src"));
    });
    // console.log(newsItem.naverLink);
    // console.log(imgArray);

    const result = await News.create({
      newsTitle: newsItem.title,
      newsSourceLink: newsItem.sourceLink,
      newsNaverLink: newsItem.naverLink,
      newsContent: contents,
      newsDescription: newsItem.description,
      newsPubDate: newsItem.pubDate,
      newsImageURL: imgArray,
    });
    // result._id;
    // const result1 = await AttachedFile.create({});
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const getTest = async (link) => {
  try {
    const html = await getHTML(link);

    const $ = cheerio.load(html.data);

    let contents = "";
    let getContent = "";
    let firstLine = "";
    let testStr = "";
    let deleteTag = "#contents #newsct_article #dic_area .img_desc";
    let brTag = "#contents #newsct_article #dic_area br";
    const imgArray = [];

    $(deleteTag).remove();

    getContent = $(tag.content).text();
    contents = getContent.replace(/<br>/g, "\n");
    testStr = $(tag.content).html().replace(/<br>/g, "\n");

    let nonon = $(testStr).text();

    // console.log(nonon);

    // testStr = $(tag.content).html().split("<br>")[0].substr(0);

    // console.log(getContent);

    // console.log(contents);
  } catch (err) {
    console.log(err);
  }
};

const naverNews = async (idx) => {
  const client_id = "UE3IygxZHphTZ5KNq23v";
  const client_secret = "z0I6Qadp9U";
  const keyword = "반려동물";
  const api_url =
    "https://openapi.naver.com/v1/search/news?display=100&sort=sim&query=" +
    encodeURI(keyword) +
    "&start=" +
    idx;
  let request = require("request");
  const option = {};
  const options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };

  request.get(options, async (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let newsItems = JSON.parse(body).items;
      const newsArray = [];
      let countSame = 0;

      let x;
      for (let i = 0; i < newsItems.length; i++) {
        let newsItem = {};
        newsItem.title = newsItems[i].title;
        if (newsItem.title.includes("볼보")) {
          continue;
        }

        newsItem.title = await removeEtc(newsItem.title);

        // x = newsItem.title.replace(/&#39;/g, "'");
        // x = x.replace(/&apos;/g, "'");
        // x = x.replace(/&#34;/g, '"');
        // x = x.replace(/&quot;/g, '"');
        // x = x.replace(/<b>/g, "");
        // x = x.replace(/<\/b>/g, "");
        // newsItem.title = x;
        newsItem.description = newsItems[i].description;
        if (newsItem.description.includes("볼보")) {
          continue;
        }

        newsItem.description = await removeEtc(newsItem.description);

        // x = newsItem.description.replace(/&#39;/g, "'");
        // x = x.replace(/&apos;/g, "'");
        // x = x.replace(/&#34;/g, '"');
        // x = x.replace(/&quot;/g, '"');
        // x = x.replace(/<b>/g, "");
        // x = x.replace(/<\/b>/g, "");
        // newsItem.description = x;

        newsItem.pubDate = newsItems[i].pubDate;
        newsItem.sourceLink = newsItems[i].originallink;
        newsItem.naverLink = newsItems[i].link;
        if (newsItem.sourceLink != newsItem.naverLink) {
          countSame++;
          // console.log(i + "번째 네이버뉴스 링크 존재함");

          const searchResult = await News.findOne({
            $or: [
              {
                newsTitle: newsItem.title,
                newsDescription: newsItem.description,
              },
            ],
          });
          if (searchResult == null) {
            console.log("새로운 뉴스 DB에 저장");
            getData(newsItem);
          }
        }
        // newsArray.push(newsItem);
        // console.log(newsItem.title);
      }
      // console.log("총 " + countSame + "개의 네이버 뉴스 링크 발견됨");
    } else {
      console.log("error = " + response.statusCode);
    }
  });
};

const youtubeNews = async () => {
  const youtubeAPI =
    "https://www.googleapis.com/youtube/v3/search?&key=AIzaSyD11JqVwWbJsAZf40dDvtwxHoSN30Cqdb4&part=snippet&q=";
  const keyword = "반려동물뉴스";
  const resultSize = "&maxResults=100";
  const url = youtubeAPI + keyword + resultSize;
  let https = require("https");

  let Youtube = require("youtube-node");
  let youtube = new Youtube();
  let word = "반려동물뉴스";
  let limit = 50;
  youtube.setKey("AIzaSyD11JqVwWbJsAZf40dDvtwxHoSN30Cqdb4");

  // youtube.addParam('order', 'rating'); // 평점 순으로 정렬
  // youtube.addParam("type", "video"); // 타입 지정

  youtube.search(word, limit, async (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    // console.log(JSON.stringify(result, null, 2));

    let newsItems = result["items"];

    const newsArray = [];

    for (let i = 0; i < newsItems.length; i++) {
      let newsItem = {};
      let x;
      newsItem.videoID = newsItems[i].id.videoId;
      newsItem.title = newsItems[i].snippet.title;
      x = newsItem.title.replace(/&#39;/g, "'");
      x = x.replace(/&apos;/g, "'");
      x = x.replace(/&#34;/g, '"');
      x = x.replace(/&quot;/g, '"');
      newsItem.title = x;
      newsItem.description = newsItems[i].snippet.description;
      x = newsItem.description.replace(/&#39;/g, "'");
      x = x.replace(/&apos;/g, "'");
      x = x.replace(/&#34;/g, '"');
      x = x.replace(/&quot;/g, '"');
      newsItem.description = x;
      newsItem.thumbnails = newsItems[i].snippet.thumbnails.default.url;

      // console.log(newsItem.title);

      const searchResult = await VideoNews.findOne({
        videoId: newsItem.videoID,
      });
      if (searchResult == null) {
        console.log("새로운 유튜브 뉴스 DB에 저장");
        newsArray.push(newsItem);
        const result = VideoNews.create({
          newsTitle: newsItem.title,
          videoId: newsItem.videoID,
          newsDescription: newsItem.description,
          thumbnailURL: newsItem.thumbnails,
        });
      }
    }
  });
};

const crawler = async () => {
  // const articleRefresh = await News.deleteMany();
  // const videoRefresh = await VideoNews.deleteMany();
  naverNews("1");
  // naverNews("2");
  // naverNews("3");
  // naverNews("4");
  youtubeNews();
  // getTest("https://n.news.naver.com/mnews/article/001/0013605975?sid=101");
};

module.exports = crawler;