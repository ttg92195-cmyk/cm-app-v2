// ============================================
// MovieStreamApp - MovieCard Component
// ============================================

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, MOVIE_CARD } from '../styles/colors';

const { width: screenWidth } = Dimensions.get('window');

const MovieCard = ({ movie, onPress, size = 'normal' }) => {
  const isLarge = size === 'large';
  const cardWidth = isLarge ? screenWidth * 0.45 : MOVIE_CARD.width;
  const cardHeight = isLarge ? cardWidth * 1.5 : MOVIE_CARD.height;

  return (
    <TouchableOpacity
      style={[styles.container, { width: cardWidth }]}
      onPress={() => onPress(movie)}
      activeOpacity={0.7}
    >
      <View style={[styles.posterContainer, { height: cardHeight }]}>
        <Image
          source={{ uri: movie.poster }}
          style={styles.poster}
          resizeMode="cover"
        />
        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>★ {movie.rating}</Text>
        </View>
        {/* Gradient Overlay at Bottom */}
        <View style={styles.gradientOverlay} />
        <View style={styles.titleOverlay}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {movie.title}
          </Text>
        </View>
      </View>
      <Text style={styles.movieYear}>{movie.year} • {movie.duration}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: SPACING.md,
  },
  posterContainer: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    elevation: 6,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.overlayHeavy,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.starFilled,
    fontSize: FONT_SIZES.caption,
    fontWeight: 'bold',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: SPACING.sm,
    right: SPACING.sm,
  },
  movieTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.caption,
    fontWeight: 'bold',
    textShadowColor: COLORS.shadow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  movieYear: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.caption,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
});

export default MovieCard;
