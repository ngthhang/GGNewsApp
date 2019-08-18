import React from 'react';
import {
  ActivityIndicator,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingMore: false,
      error: false,
      page: 1,
      lastPageReached: false,
      articles: [],
      totalResults: 0,
    }
  }
  componentDidMount() {
    this.setState({
      loading: true
    })
    const { page } = this.state;
    this.callApi(page);
    this.setState({
      loading: false
    })
  }

  onEndReached = () => {
    const { page } = this.state;
    const newPage= page + 1;
    this.setState({
      loadingMore: true
    })
    this.callApi(newPage);
    this.setState({
      loadingMore: false
    })
  }

  callApi = async (page) => {
    const api_key = 'ca5154e564224f24955d93d7bb8ece7a';
    const { lastPageReached, articles , totalResults} = this.state;
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}&page=${page}`);
      if (response.ok) {
        const responseFinal = await response.json();
        const hasMoreArticles = responseFinal.articles.length > 0;
        const MoretotalResults = responseFinal.totalResults;
        const countArticles = MoretotalResults + totalResults;
        if (hasMoreArticles) {
          const newArticleList = articles.concat(responseFinal.articles);
          this.setState({
            articles: newArticleList,
            totalResults: countArticles, 
            page: page
          })
        }
        else {
          this.setState({
            lastPageReached: true
          })
        }
        if (lastPageReached) {
          return;
        }
      } else {
        throw new Error('something went wrong');
      }
    }
    catch (error) {
      this.setState({
        error: true
      })
    }
  }

  _renderItem = ({ item }) => (
    <View style={styles.displayNews}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.publishedAt}>publishedAt: {item.publishedAt}</Text>
      <Image source={{ uri: item.urlToImage }} style={styles.imageNews} />
      <Text style={styles.content}>Content: {item.description}</Text>
      <View style={styles.displayButton}>
        <TouchableOpacity style={styles.readMoreButton} onPress={() => {
          Linking.canOpenURL(item.url).then(supported => {
            if (supported) {
              Linking.openURL(item.url);
            } else {
              console.log(`Don't know how to open URL: ${item.url}`);
            }
          })
        }}>
          <Text style={styles.ReadMoreText}>Read More</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}
          onPress={() => {
            alert('click saved');
          }}>
          <AntDesign
            name='book'
            size={27}
            color='black'
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={() => {
          alert('share');
        }}>
          <AntDesign
            size={27}
            color='black'
            name='sharealt'
          />
        </TouchableOpacity>
      </View>
    </View>
  )

  render() {
    const { loading, error, articles, lastPageReached, totalResults, loadingMore } = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator loading={loading} size='large' />
        </View>
      )
    }
    else if (error) {
      return (
        <View style={styles.container}>
          <Text>Error =(((</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text>articles count: {totalResults}</Text>
          <FlatList
            data={articles}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={lastPageReached ? <Text style={{textAlign:'center'}}>No More Articles</Text> : <ActivityIndicator size='large' loading={loadingMore} />}
          />
        </View>
      );
    }
  }
}
HomeScreen.navigationOptions = {
  title: 'News'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  displayNews: {
    flex: 0.5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'justify'
  },
  publishedAt: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '100',
    textAlign: 'left'
  },
  imageNews: {
    width: 300,
    height: 200
  },
  displayButton: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    fontSize: 14,
    fontWeight: '300'
  },
  readMoreButton: {
    padding: 10,
    textAlign: 'center',
    paddingHorizontal: 50,
    backgroundColor: '#4fc3f7'
  },
  ReadMoreText: {
    fontSize: 15,
    fontWeight: '200',
    color: 'white'
  },

});
