// Generated by CoffeeScript 1.6.1
(function() {
  var SearchResult, stemmer,
    _this = this,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  stemmer = function(w, debug) {
    var C, V, c, debugFunction, dummyDebug, firstch, fp, meq1, mgr0, mgr1, origword, re, re2, re3, re4, realDebug, s_v, stem, step2list, step3list, suffix, v;
    step2list = {
      "ational": "ate",
      "tional": "tion",
      "enci": "ence",
      "anci": "ance",
      "izer": "ize",
      "bli": "ble",
      "alli": "al",
      "entli": "ent",
      "eli": "e",
      "ousli": "ous",
      "ization": "ize",
      "ation": "ate",
      "ator": "ate",
      "alism": "al",
      "iveness": "ive",
      "fulness": "ful",
      "ousness": "ous",
      "aliti": "al",
      "iviti": "ive",
      "biliti": "ble",
      "logi": "log"
    };
    step3list = {
      "icate": "ic",
      "ative": "",
      "alize": "al",
      "iciti": "ic",
      "ical": "ic",
      "ful": "",
      "ness": ""
    };
    c = "[^aeiou]";
    v = "[aeiouy]";
    C = c + "[^aeiouy]*";
    V = v + "[aeiou]*";
    mgr0 = "^(" + C + ")?" + V + C;
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$";
    mgr1 = "^(" + C + ")?" + V + C + V + C;
    s_v = "^(" + C + ")?" + v;
    dummyDebug = function() {
      return null;
    };
    realDebug = function() {
      return console.log(Array.prototype.slice.call(arguments).join(' '));
    };
    debugFunction = debug ? realDebug : dummyDebug;
    origword = w;
    if (w.length < 3) {
      return w;
    }
    firstch = w.substr(0, 1);
    if (firstch === "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }
    re = /^(.+?)(ss|i)es$/;
    re2 = /^(.+?)([^s])s$/;
    if (re.test(w)) {
      w = w.replace(re, "$1$2");
      debugFunction('1a', re, w);
    } else if (re2.test(w)) {
      w = w.replace(re2, "$1$2");
      debugFunction('1a', re2, w);
    }
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;
    if (re.test(w)) {
      fp = re.exec(w);
      re = new RegExp(mgr0);
      w = w.replace(re, "");
      debugFunction('1b', re, w);
    } else if (re2.test(w)) {
      fp = re2.exec(w);
      stem = fp[1];
      re2 = new RegExp(s_v);
      if (re2.test(stem)) {
        w = stem;
        debugFunction('1b', re2, w);
        re2 = /(at|bl|iz)$/;
        re3 = new RegExp("([^aeiouylsz])\\1$");
        re4 = new RegExp("^" + C + V + v + "[^aeiouwxy]$");
        if (re2.test(w)) {
          w = w + "e";
          debugFunction('1b', re2, w);
        } else if (re3.test(w)) {
          re = /.$/;
          w = w.replace(re, "");
          debugFunction('1b', re3, w);
        } else if (re4.test(w)) {
          w = w + "e";
          debugFunction('1b', re4, w);
        }
      }
    }
    re = new RegExp("^(.*" + v + ".*)y$");
    if (re.test(w)) {
      fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
      debugFunction('1c', re, w);
    }
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) {
      fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step2list[suffix];
        debugFunction('2', re, w);
      }
    }
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) {
      fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step3list[suffix];
        debugFunction('3', re, w);
      }
    }
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) {
      fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      if (re.test(stem)) {
        w = stem;
        debugFunction('4', re, w);
      } else if (re2.test(w)) {
        fp = re2.exec(w);
        stem = fp[1] + fp[2];
        re2 = new RegExp(mgr1);
        if (re2.test(stem)) {
          w = stem;
          debugFunction('4', re2, w);
        }
      }
    }
    re = /^(.+?)e$/;
    if (re.test(w)) {
      fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      re2 = new RegExp(meq1);
      re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (re.test(stem || re2.test(stem && !re3.test(stem)))) {
        w = stem;
        debugFunction('5', re, re2, re3, w);
      }
    }
    re = /ll$/;
    re2 = new RegExp(mgr1);
    if (re.test(w && re2.test(w))) {
      re = /.$/;
      w = w.replace(re, "");
      debugFunction('5', re, re2, w);
    }
    if (firstch === "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }
    return w;
  };

  /* --------------------------------------------
       Begin site-search.coffee
  --------------------------------------------
  */


  window.searchTimeout = null;

  $(document).ready(function() {
    var query;
    query = new RegExp('[\\?&]' + 'query' + '=([^&#]*)').exec(window.location.href);
    if (query !== null) {
      performSearch(decodeURIComponent(query[1].replace(/[+]/gi, ' ')));
    }
    return $('#search-query').on('keyup', function(e) {
      return performSearch($(this).val());
    });
  });

  window.performSearch = function(query) {
    var result;
    $('#search-results').empty();
    if (query.isEmpty() === true) {
      $('#search-results').append('Enter something to search for');
      return;
    }
    result = new SearchResult(query);
    return result.search();
  };

  String.prototype.isEmpty = function() {
    if (this.replace(/\s/g, '') === '') {
      return true;
    }
    return false;
  };

  SearchResult = (function() {

    function SearchResult(searchTerm) {
      var _this = this;
      this.searchTerm = searchTerm;
      this.search = function() {
        return SearchResult.prototype.search.apply(_this, arguments);
      };
      this.renderResult = function() {
        return SearchResult.prototype.renderResult.apply(_this, arguments);
      };
      this.processPostResult = function(postScore) {
        return SearchResult.prototype.processPostResult.apply(_this, arguments);
      };
      this.getPosts = function() {
        return SearchResult.prototype.getPosts.apply(_this, arguments);
      };
      this.getPostIDs = function(data) {
        return SearchResult.prototype.getPostIDs.apply(_this, arguments);
      };
      this.loadIndexes = function(indexURLs) {
        return SearchResult.prototype.loadIndexes.apply(_this, arguments);
      };
      this.getIndexURLs = function() {
        return SearchResult.prototype.getIndexURLs.apply(_this, arguments);
      };
      this.parseWords = function(query) {
        return SearchResult.prototype.parseWords.apply(_this, arguments);
      };
      this.stemmedWords = this.parseWords(searchTerm);
      this.posts = [];
    }

    SearchResult.prototype.parseWords = function(query) {
      var sWords, word, words, _i, _len;
      words = query.toLowerCase().match(/\w{2,}/gi);
      sWords = [];
      for (_i = 0, _len = words.length; _i < _len; _i++) {
        word = words[_i];
        if (__indexOf.call(sWords, word) < 0) {
          sWords.push(stemmer(word));
        }
      }
      return sWords;
    };

    SearchResult.prototype.getIndexURLs = function() {
      var indexURLs, temp, word, _i, _len, _ref;
      indexURLs = {};
      _ref = this.stemmedWords;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        temp = "/search/terms/" + (word.slice(0, 2).toLowerCase()) + ".json";
        indexURLs[temp] = null;
      }
      return indexURLs;
    };

    SearchResult.prototype.loadIndexes = function(indexURLs) {
      var file, json_calls, json_data,
        _this = this;
      json_calls = [];
      json_data = [];
      for (file in indexURLs) {
        json_calls.push($.getJSON(file, function(data) {
          return json_data.push(data);
        }));
      }
      return $.when.apply($, json_calls).then(function() {
        return _this.getPostIDs(json_data);
      });
    };

    SearchResult.prototype.getPostIDs = function(data) {
      var id, item, postData, postID, term, _i, _j, _len, _len1, _ref;
      postData = {};
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        item = data[_i];
        for (term in item) {
          if ($.inArray(term, this.stemmedWords) !== -1) {
            _ref = item[term];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              id = _ref[_j];
              if (typeof postData[id] === 'undefined') {
                postData[id] = 1;
              } else {
                postData[id]++;
              }
            }
          }
        }
      }
      for (postID in postData) {
        this.posts.push([postID, postData[postID]]);
      }
      return this.getPosts();
    };

    SearchResult.prototype.getPosts = function() {
      var get_requests, post, _i, _len, _ref,
        _this = this;
      if (this.posts.length <= 0) {
        $('#search-results').append('<p>No results found</p>');
        return;
      }
      get_requests = [];
      this.search_results = [];
      _ref = this.posts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        post = _ref[_i];
        get_requests.push($.get("/search/posts/" + post[0] + ".html", this.processPostResult(post[1])));
      }
      return $.when.apply($, get_requests).then(function() {
        return _this.renderResult();
      });
    };

    SearchResult.prototype.processPostResult = function(postScore) {
      var _this = this;
      return function(data) {
        return _this.search_results.push([postScore, data]);
      };
    };

    SearchResult.prototype.renderResult = function() {
      var search_result, _i, _len, _ref, _results;
      this.search_results = this.search_results.sort(function(a, b) {
        return b[0] - a[0];
      });
      _ref = this.search_results;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        search_result = _ref[_i];
        _results.push($('#search-results').append(search_result[1]));
      }
      return _results;
    };

    SearchResult.prototype.search = function() {
      return this.loadIndexes(this.getIndexURLs());
    };

    return SearchResult;

  })();

}).call(this);
