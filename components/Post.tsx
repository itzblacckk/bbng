import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

interface PostProps {
  username: string;
  profileImage: any; // Use the appropriate type for your image source
  postImage: any; // Use the appropriate type for your image source
  date: string;
}

const Post: React.FC<PostProps> = ({ username, profileImage, postImage, date }) => {
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [showComments, setShowComments] = useState<boolean>(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={profileImage} style={styles.profileImage} />
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <Image source={postImage} style={styles.postImage} />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLike} style={styles.iconButton}>
          <EvilIcons name="heart" size={24} color="#ff0000" />
          <Text style={styles.iconText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowComments(!showComments)} style={styles.iconButton}>
          <EvilIcons name="comment" size={24} color="#000" />
          <Text style={styles.iconText}>{comments.length}</Text>
        </TouchableOpacity>
      </View>
      {showComments && (
        <View style={styles.commentsSection}>
          {comments.map((comment, index) => (
            <Text key={index} style={styles.comment}>{comment}</Text>
          ))}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment..."
            />
            <TouchableOpacity onPress={handleAddComment} style={styles.addButton}>
              <Text style={styles.addButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 20,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    borderRadius: 8,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 5,
  },
  commentsSection: {
    marginTop: 10,
  },
  comment: {
    marginBottom: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
  },
  addButton: {
    marginLeft: 10,
  },
  addButtonText: {
    color: '#1a73e8',
  },
});

export default Post;
