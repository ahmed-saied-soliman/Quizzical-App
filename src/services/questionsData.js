import axios from 'axios';

export default async function questionsData() {
  try {
    const result = await axios.get(
      'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
    );
    return result.data.results;
  } catch (error) {
    console.error(error);
  }
}
