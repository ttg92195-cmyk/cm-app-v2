// ============================================
// MovieStreamApp - Favorites Screen
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../styles/colors';
import { MOVIES } from '../data/movies';
import MovieCard from '../components/MovieCard';

const FavoritesScreen = ({ navigation }) => {
  // Placeholder: show a few movies as "favorites"
  const [favorites] = useState(MOVIES.slice(0, 4));

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>❤️</Text>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Movies you favorite will appear here. Start browsing and add some!
      </Text>
      <TouchableOpacity
        style={styles.browseBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.browseBtnText}>Browse Movies</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerCount}>{favorites.length} movies</Text>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={(m) => navigation.navigate('Detail', { movie: m })}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmpty()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  headerCount: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.body,
    marginTop: SPACING.xs,
  },
  listContent: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.xxxl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
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
    marginBottom: SPACING.xl,
  },
  browseBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
  },
  browseBtnText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
