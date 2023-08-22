import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={decrementCount}>
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerContainer}>
        <Text style={styles.count}>{count}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={incrementCount}>
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // To arrange elements horizontally
    justifyContent: 'space-between', // Space between the buttons and counter
    alignItems: 'center', // Center vertically
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flex: 1, // Equal width for both button containers
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
  centerContainer: {
    flex: 2, // Wider space for the counter
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 256,
    fontWeight: 'bold',
  },
});

export default App;

