import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [caption, setCaption] = useState('');
  const [commentText, setCommentText] = useState('');

  const addPost = () => {
    if (username && caption) {
      const newPost = {
        id: Date.now().toString(),
        username,
        caption,
        likes: 0,
        comments: [],
      };
      setPosts([...posts, newPost]);
      setUsername('');
      setCaption('');
    }
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const likePost = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const addComment = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { username, text: commentText }],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setCommentText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Instagram Clone</Text>
      
      {/* Post Creation */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Caption"
        value={caption}
        onChangeText={(text) => setCaption(text)}
      />
      <Button title="Create Post" onPress={addPost} />

      {/* Post Display */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animatable.View animation="fadeInUp" style={styles.postContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.caption}>{item.caption}</Text>
            <Text style={styles.likes}>Likes: {item.likes}</Text>
            <TouchableOpacity onPress={() => likePost(item.id)}>
              <Text style={styles.likeButton}>Like</Text>
            </TouchableOpacity>
            
            <Text style={styles.comments}>Comments:</Text>
            {item.comments.map((comment, index) => (
              <View key={index} style={styles.comment}>
                <Text style={styles.commentText}>
                  {comment.username}: {comment.text}
                </Text>
              </View>
            ))}
            <TextInput
              style={styles.input}
              placeholder="Add a comment"
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
            />
            <Button title="Add Comment" onPress={() => addComment(item.id)} />
            
            <TouchableOpacity onPress={() => deletePost(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  postContainer: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    marginBottom: 5,
  },
  likes: {
    marginBottom: 5,
    color: 'blue',
  },
  likeButton: {
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comments: {
    marginBottom: 5,
  },
  comment: {
    marginBottom: 5,
  },
  commentText: {
    fontStyle: 'italic',
  },
  deleteButton: {
    color: 'red',
  },
});
