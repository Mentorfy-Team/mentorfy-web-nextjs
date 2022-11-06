declare namespace LogTypes {
  enum Codes {
    // ? code 200+
    // enum Mentor {
    new_mentor = 200,
    mentory_created = 210,
    added_client_mentory = 220,
    removed_client_mentory = 221,
    removed_client = 222,

    // ? code 300+
    // Client {
    new_client = 300,
    entered_mentory = 310,
    left_mentory = 311,
    left_mentories = 312,
    interected_mentory = 320,

    // ? code 100+
    // System {
    viewed_mentory = 100,
    upload_file = 110,
  }
}
