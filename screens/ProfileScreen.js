// ============================================
// MovieStreamApp - Profile Screen
// ============================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../styles/colors';

const ProfileScreen = ({ navigation }) => {
  const menuItems = [
    { icon: '👤', label: 'Edit Profile', screen: 'Profile' },
    { icon: '🔔', label: 'Notifications', screen: 'Profile' },
    { icon: '⬇', label: 'Downloads', screen: 'Profile' },
    { icon: '🔒', label: 'Privacy & Security', screen: 'Profile' },
    { icon: '🌍', label: 'Language', screen: 'Profile' },
    { icon: '🎨', label: 'Appearance', screen: 'Profile' },
    { icon: '❓', label: 'Help & Support', screen: 'Profile' },
    { icon: '📋', label: 'Terms of Service', screen: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>Movie Lover</Text>
          <Text style={styles.userEmail}>movielover@example.com</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Watched</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Downloads</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.version}>MovieStream v1.0.0</Text>

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
  profileHeader: {
    alignItems: 'center',
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.base,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  userEmail: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.body,
    marginBottom: SPACING.md,
  },
  editBtn: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.xxl,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editBtnText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.caption,
    marginTop: SPACING.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },

  // Menu
  menuSection: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  menuLabel: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.body,
  },
  menuArrow: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.title,
  },

  // Logout
  logoutBtn: {
    backgroundColor: COLORS.primaryDark,
    marginHorizontal: SPACING.base,
    marginTop: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.subheading,
    fontWeight: 'bold',
  },
  version: {
    color: COLORS.textDark,
    fontSize: FONT_SIZES.caption,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
});

export default ProfileScreen;
