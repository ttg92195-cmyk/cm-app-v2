// ============================================
// MovieStreamApp - Home Screen
// ============================================

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, BACKDROP } from '../styles/colors';
import { CATEGORIES, getFeaturedMovie, getMoviesByCategory } from '../data/movies';
import CategoryRow from '../components/CategoryRow';
import MovieCard from '../components/MovieCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const featuredMovies = getMoviesByCategory('trending');

  const renderFeaturedBanner = () => {
    const movie = featuredMovies[featuredIndex] || getFeaturedMovie();

    return (
      <View style={styles.featuredContainer}>
        <Image
          source={{ uri: movie.backdrop }}
          style={styles.featuredBackdrop}
          resizeMode="cover"
        />
        {/* Gradient Overlays */}
        <View style={styles.gradientBottom} />
        <View style={styles.gradientTop} />

        {/* Content */}
        <View style={styles.featuredContent}>
          <Text style={styles.featuredLabel}>🔥 Featured Today</Text>
          <Text style={styles.featuredTitle}>{movie.title}</Text>
          <Text style={styles.featuredSubtitle}>{movie.subtitle}</Text>
          <View style={styles.featuredMeta}>
            <Text style={styles.metaItem}>★ {movie.rating}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaItem}>{movie.year}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaItem}>{movie.duration}</Text>
          </View>
          <View style={styles.featuredButtons}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => navigation.navigate('Player', { movie })}
            >
              <Text style={styles.playButtonText}>▶ Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => navigation.navigate('Detail', { movie })}
            >
              <Text style={styles.infoButtonText}>ℹ More Info</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {featuredMovies.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === featuredIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderFeaturedCarousel = () => (
    <View style={styles.carouselSection}>
      <Text style={styles.sectionTitle}>🔥 Trending Now</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContent}>
        {featuredMovies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            size="large"
            onPress={(m) => navigation.navigate('Detail', { movie: m })}
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appLogo}>🎬 MovieStream</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerBtn}>
              <Text style={styles.headerBtnText}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Banner */}
        {renderFeaturedBanner()}

        {/* Trending Carousel */}
        {renderFeaturedCarousel()}

        {/* Category Rows */}
        {CATEGORIES.filter(c => c.key !== 'trending').map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            onMoviePress={(movie) => navigation.navigate('Detail', { movie })}
          />
        ))}

        {/* Bottom Spacer */}
        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  appLogo: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerBtn: {
    padding: SPACING.sm,
  },
  headerBtnText: {
    fontSize: FONT_SIZES.title,
  },

  // Featured Banner
  featuredContainer: {
    height: BACKDROP.height + 80,
    position: 'relative',
  },
  featuredBackdrop: {
    width: '100%',
    height: BACKDROP.height,
    position: 'absolute',
    top: 0,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: COLORS.background,
    opacity: 0.95,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: COLORS.background,
    opacity: 0.5,
  },
  featuredContent: {
    position: 'absolute',
    bottom: SPACING.lg,
    left: SPACING.base,
    right: SPACING.base,
  },
  featuredLabel: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.caption,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: SPACING.xs,
  },
  featuredTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  featuredSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.subheading,
    marginBottom: SPACING.sm,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  metaItem: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
  },
  metaDot: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.body,
    marginHorizontal: SPACING.sm,
  },
  featuredButtons: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
  },
  infoButton: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },

  // Pagination
  pagination: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SPACING.xxs || 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textDark,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 20,
    borderRadius: 3,
  },

  // Carousel
  carouselSection: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    marginLeft: SPACING.base,
    marginBottom: SPACING.md,
  },
  carouselContent: {
    paddingLeft: SPACING.base,
    paddingRight: SPACING.sm,
  },
});

export default HomeScreen;
