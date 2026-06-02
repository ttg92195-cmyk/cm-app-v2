// ============================================
// MovieStreamApp - CategoryRow Component
// ============================================

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../styles/colors';
import MovieCard from './MovieCard';
import { getMoviesByCategory } from '../data/movies';

const CategoryRow = ({ category, onMoviePress }) => {
  const movies = getMoviesByCategory(category.key);

  if (!movies || movies.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.seeAll}>See All ›</Text>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={onMoviePress} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.sm,
  },
  categoryName: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
  listContent: {
    paddingLeft: SPACING.base,
    paddingRight: SPACING.sm,
  },
});

export default CategoryRow;
