import MediaList from "@assets/data/mediaList.json";
import MediaListItem from "@/components/media-list-item";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const mediaList = MediaList;
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContianer}>
          <Text style={styles.headerTitle}>For Devs</Text>
          <Feather name="search" size={22} color="white" />
        </View>

        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>TV Shows</Text>
          <Text style={styles.filterText}>Movies</Text>
          <Text style={styles.filterText}>Categories</Text>
        </View>
      </View>

      <FlatList
        data={mediaList}
        renderItem={({ item: verticalListItem }) => (
          <View>
            <Text style={styles.sectionTitle}>{verticalListItem.title}</Text>
            <FlatList
              horizontal
              data={verticalListItem.data}
              renderItem={({ item: horizontalListItem }) => (
                <MediaListItem mediaItem={horizontalListItem} />
              )}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 17,
    color: "white",
    fontWeight: "700",
    paddingVertical: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  headerTitleContianer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterText: {
    color: "lightgrey",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    gap: 5,
  },
  headerContainer: {
    marginHorizontal: 10,
    gap: 10,
  },
});
