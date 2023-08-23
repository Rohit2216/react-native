import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const API_KEY = '372f7c0a'; 

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`
      );
      const data = await response.json();
      if (data.Search) {
        setSearchResults(data.Search);
        setError(null);
      } else {
        setSearchResults([]);
        setError('No results found.');
      }
    } catch (err) {
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setSearchResults([]);
    setSelectedMovie(null);
    setSearchQuery('');
  };

  const showMovieDetails = async (imdbID) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
      );
      const data = await response.json();
      setSelectedMovie(data);
      setError(null);
    } catch (err) {
      setError('Error fetching movie details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Movie Search App
      </Text>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter a movie title..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={searchMovies} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {selectedMovie ? (
        <View>
          <TouchableOpacity onPress={() => setSelectedMovie(null)}>
            <Text style={{ color: 'blue', marginBottom: 10 }}>Back to results</Text>
          </TouchableOpacity>
          <Image
            style={{ width: 200, height: 300, marginBottom: 10 }}
            source={{ uri: selectedMovie.Poster }}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>
            {selectedMovie.Title} ({selectedMovie.Year})
          </Text>
          <Text style={{ marginBottom: 10 }}>{selectedMovie.Plot}</Text>
          <Text>Ratings:</Text>
          {selectedMovie.Ratings.map((rating, index) => (
            <Text key={index}>
              {rating.Source}: {rating.Value}
            </Text>
          ))}
        </View>
      ) : (
        <View>
          {searchResults.map((result) => (
            <TouchableOpacity
              key={result.imdbID}
              onPress={() => showMovieDetails(result.imdbID)}
            >
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Image
                  style={{ width: 50, height: 75, marginRight: 10 }}
                  source={{ uri: result.Poster }}
                />
                <Text>{result.Title} ({result.Year})</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedMovie && (
        <Button title="Clear" onPress={clearResults} />
      )}
    </ScrollView>
  );
};

export default App;
