// ============================================
// MovieStreamApp - Movie Detail Screen
// ============================================

import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, BACKDROP } from '../styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MovieDetailScreen = ({ route, navigation }) => {
  const { movie } = route.params;

  const handlePlay = () => {
    navigation.navigate('Player', { movie });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: movie.title,
        message: `Check out "${movie.title}" on MovieStream! 🎬`,
      });
    } catch (error) {
      // Share failed
    }
  };

  const renderStars = (rating) => {
    const stars = Math.round(rating / 2);
    return Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={i < stars ? styles.starFilled : styles.starEmpty}>★</Text>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Backdrop Image */}
        <View style={styles.backdropContainer}>
          <Image
            source={{ uri: movie.backdrop }}
            style={styles.backdrop}
            resizeMode="cover"
          />
          <View style={styles.backdropGradient} />

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          {/* Play Overlay */}
          <TouchableOpacity
            style={styles.playOverlay}
            onPress={handlePlay}
            activeOpacity={0.7}
          >
            <View style={styles.playCircle}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Movie Info */}
        <View style={styles.infoContainer}>
          {/* Title & Subtitle */}
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subtitle}>{movie.subtitle}</Text>

          {/* Meta Row */}
          <View style={styles.metaRow}>
            <View style={styles.ratingContainer}>
              {renderStars(movie.rating)}
              <Text style={styles.ratingNumber}>{movie.rating}/10</Text>
            </View>
          </View>

          <View style={styles.metaChips}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{movie.year}</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{movie.duration}</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{movie.language}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.playBtn} onPress={handlePlay}>
              <Text style={styles.playBtnText}>▶ Play Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadBtn}>
              <Text style={styles.downloadBtnText}>⬇ Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
              <Text style={styles.shareBtnText}>↗ Share</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Synopsis</Text>
            <Text style={styles.description}>{movie.description}</Text>
          </View>

          {/* Director */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Director</Text>
            <Text style={styles.detailText}>{movie.director}</Text>
          </View>

          {/* Cast */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cast</Text>
            <View style={styles.castList}>
              {movie.cast.map((actor, index) => (
                <View key={index} style={styles.castChip}>
                  <Text style={styles.castChipText}>{actor}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Similar Movies Placeholder */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>You May Also Like</Text>
            <Text style={styles.comingSoon}>Coming soon...</Text>
          </View>

          {/* Bottom Spacer */}
          <View style={{ height: SPACING.xxxl }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Backdrop
  backdropContainer: {
    height: BACKDROP.height,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: COLORS.background,
    opacity: 0.95,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: SPACING.base,
    backgroundColor: COLORS.overlayMedium,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.xl,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.overlayMedium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.textPrimary,
  },
  playIcon: {
    color: COLORS.textPrimary,
    fontSize: 28,
    marginLeft: 4,
  },

  // Info
  infoContainer: {
    paddingHorizontal: SPACING.base,
    marginTop: -SPACING.xxl,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.subheading,
    marginBottom: SPACING.md,
  },

  // Stars
  metaRow: {
    marginBottom: SPACING.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starFilled: {
    color: COLORS.starFilled,
    fontSize: FONT_SIZES.title,
    marginRight: 2,
  },
  starEmpty: {
    color: COLORS.starEmpty,
    fontSize: FONT_SIZES.title,
    marginRight: 2,
  },
  ratingNumber: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
    marginLeft: SPACING.sm,
  },

  // Chips
  metaChips: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  chip: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.sm,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.caption,
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
  },
  playBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  playBtnText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.subheading,
    fontWeight: 'bold',
  },
  downloadBtn: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  downloadBtnText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.caption,
    fontWeight: '600',
  },
  shareBtn: {
    width: 48,
    backgroundColor: COLORS.surfaceLight,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  shareBtnText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
  },

  // Sections
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
    lineHeight: 22,
  },
  detailText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
  },

  // Cast
  castList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  castChip: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.xxl,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  castChipText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.caption,
  },
  comingSoon: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.body,
    fontStyle: 'italic',
  },
});

export default MovieDetailScreen;
