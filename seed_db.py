import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

DATABASE_URL = os.getenv("DATABASE_URL")
SQL_FILE_PATH = "/home/ubuntu/upload/subscription_plans_rows(1).sql"

def seed_subscription_plans():
    """Connects to the database and executes the SQL script to seed subscription plans."""
    if not DATABASE_URL:
        print("Error: DATABASE_URL not found in environment variables.")
        return

    conn = None
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()

        print(f"Connected to database. Executing SQL from {SQL_FILE_PATH}...")

        # Read the SQL file
        with open(SQL_FILE_PATH, 'r') as f:
            sql_script = f.read()

        # Execute the SQL script
        # Note: Supabase RLS might prevent this if not run as a superuser or with appropriate permissions.
        # We will attempt to execute the whole script as a single command.
        cur.execute(sql_script)

        # Commit the changes
        conn.commit()
        print("Successfully executed SQL script and seeded subscription_plans table.")

    except psycopg2.Error as e:
        print(f"Database Error: {e}")
        print("Note: If this is a Supabase database, you may need to run the SQL directly in the Supabase SQL Editor if RLS or permissions are an issue.")
        conn.rollback()
    except FileNotFoundError:
        print(f"Error: SQL file not found at {SQL_FILE_PATH}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    finally:
        if conn:
            cur.close()
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    seed_subscription_plans()
