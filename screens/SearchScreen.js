// ============================================
// MovieStreamApp - Search Screen
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../styles/colors';
import { searchMovies, CATEGORIES } from '../data/movies';
import MovieCard from '../components/MovieCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim().length > 0) {
      setResults(searchMovies(text));
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  };

  const renderGenreChip = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.genreChip}
      onPress={() => {
        setQuery(category.name);
        setResults(searchMovies(category.key === 'trending' ? 'the' : category.key === 'action' ? 'steel' : category.key === 'comedy' ? 'mix' : category.key === 'romance' ? 'paris' : category.key === 'horror' ? 'hollow' : category.key === 'scifi' ? 'galaxy' : category.key === 'drama' ? 'silk' : 'paws'));
        setHasSearched(true);
      }}
    >
      <Text style={styles.genreChipText}>{category.name}</Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      {!hasSearched ? (
        <>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>Search for Movies</Text>
          <Text style={styles.emptySubtitle}>
            Search by title, actor, or director
          </Text>
          <View style={styles.genreContainer}>
            <Text style={styles.genreLabel}>Browse by Genre</Text>
            <View style={styles.genreGrid}>
              {CATEGORIES.map(renderGenreChip)}
            </View>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.emptyIcon}>😕</Text>
          <Text style={styles.emptyTitle}>No Results Found</Text>
          <Text style={styles.emptySubtitle}>
            Try searching with different keywords
          </Text>
        </>
      )}
    </View>
  );

  const renderResultItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation.navigate('Detail', { movie: item })}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.poster }} style={styles.resultPoster} resizeMode="cover" />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.resultSubtitle} numberOfLines={1}>{item.subtitle}</Text>
        <View style={styles.resultMeta}>
          <Text style={styles.resultRating}>★ {item.rating}</Text>
          <Text style={styles.resultYear}>{item.year}</Text>
          <Text style={styles.resultDuration}>{item.duration}</Text>
        </View>
        <Text style={styles.resultDesc} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies, actors, directors..."
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={handleSearch}
            autoCorrect={false}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results or Empty State */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={renderResultItem}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchBarContainer: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  searchIcon: {
    fontSize: FONT_SIZES.title,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
    paddingVertical: 0,
  },
  clearIcon: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.title,
    marginLeft: SPACING.sm,
  },

  // Results List
  resultsList: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.xxxl,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  resultPoster: {
    width: 100,
    height: 150,
  },
  resultInfo: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'center',
  },
  resultTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.subheading,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  resultSubtitle: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.caption,
    marginBottom: SPACING.xs,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  resultRating: {
    color: COLORS.starFilled,
    fontSize: FONT_SIZES.caption,
    fontWeight: 'bold',
    marginRight: SPACING.sm,
  },
  resultYear: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.caption,
    marginRight: SPACING.sm,
  },
  resultDuration: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.caption,
  },
  resultDesc: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.caption,
    lineHeight: 16,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.body,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },

  // Genre Chips
  genreContainer: {
    width: '100%',
  },
  genreLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.subheading,
    fontWeight: '600',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreChip: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.xxl,
    margin: SPACING.xs,
  },
  genreChipText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
  },
});

export default SearchScreen;
