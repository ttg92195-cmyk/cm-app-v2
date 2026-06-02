// ============================================
// MovieStreamApp - Video Player Screen
// ============================================

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../styles/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PlayerScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(7200); // 2 hours in seconds
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleControls = () => {
    if (showControls) {
      hideControls();
    } else {
      setShowControls(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setTimeout(hideControls, 4000);
    }
  };

  const hideControls = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowControls(false));
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = currentTime / duration;

  return (
    <View style={styles.container}>
      {/* Video Area (Placeholder) */}
      <TouchableOpacity
        style={styles.videoArea}
        activeOpacity={1}
        onPress={toggleControls}
      >
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoIcon}>🎬</Text>
          <Text style={styles.videoTitle}>{movie.title}</Text>
          <Text style={styles.videoSubtitle}>{movie.subtitle}</Text>
        </View>

        {/* Controls Overlay */}
        {showControls && (
          <Animated.View style={[styles.controlsOverlay, { opacity: fadeAnim }]}>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.controlBtn}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.movieTitleOverlay} numberOfLines={1}>
                {movie.title}
              </Text>
              <TouchableOpacity>
                <Text style={styles.controlBtn}>⚙</Text>
              </TouchableOpacity>
            </View>

            {/* Center Play Button */}
            <View style={styles.centerControls}>
              <TouchableOpacity style={styles.skipBtn}>
                <Text style={styles.skipText}>⏪</Text>
                <Text style={styles.skipLabel}>10s</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.mainPlayBtn} onPress={togglePlay}>
                <Text style={styles.mainPlayIcon}>
                  {isPlaying ? '⏸' : '▶'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.skipBtn}>
                <Text style={styles.skipText}>⏩</Text>
                <Text style={styles.skipLabel}>10s</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                <View style={[styles.progressThumb, { left: `${progress * 100}%` }]} />
              </View>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </Animated.View>
        )}
      </TouchableOpacity>

      {/* Movie Info Below Player */}
      <View style={styles.movieInfoSection}>
        <Text style={styles.infoTitle}>{movie.title}: {movie.subtitle}</Text>
        <Text style={styles.infoMeta}>
          {movie.year} • {movie.duration} • {movie.language}
        </Text>
        <Text style={styles.infoDesc} numberOfLines={3}>
          {movie.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Video Area
  videoArea: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.5625, // 16:9 ratio
    backgroundColor: '#000',
    position: 'relative',
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  videoIcon: {
    fontSize: 50,
    marginBottom: SPACING.md,
  },
  videoTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
  },
  videoSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
  },

  // Controls
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlayMedium,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    paddingTop: SPACING.xl,
  },
  controlBtn: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
  movieTitleOverlay: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: SPACING.md,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainPlayBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.xxl,
  },
  mainPlayIcon: {
    color: COLORS.textPrimary,
    fontSize: 28,
  },
  skipBtn: {
    alignItems: 'center',
    padding: SPACING.md,
  },
  skipText: {
    color: COLORS.textPrimary,
    fontSize: 24,
  },
  skipLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.caption,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  timeText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.caption,
    marginHorizontal: SPACING.sm,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.textDark,
    borderRadius: 2,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    marginLeft: -8,
  },

  // Movie Info Below
  movieInfoSection: {
    padding: SPACING.base,
  },
  infoTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.subheading,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  infoMeta: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.caption,
    marginBottom: SPACING.sm,
  },
  infoDesc: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.body,
    lineHeight: 20,
  },
});

export default PlayerScreen;
