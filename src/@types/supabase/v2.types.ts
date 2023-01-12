export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      address: {
        Row: {
          city: string | null
          complement: string | null
          country: string | null
          created_at: string | null
          id: string
          neighborhood: string | null
          number: number | null
          state: string | null
          street: string | null
          zipcode: string | null
        }
        Insert: {
          city?: string | null
          complement?: string | null
          country?: string | null
          created_at?: string | null
          id: string
          neighborhood?: string | null
          number?: number | null
          state?: string | null
          street?: string | null
          zipcode?: string | null
        }
        Update: {
          city?: string | null
          complement?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          neighborhood?: string | null
          number?: number | null
          state?: string | null
          street?: string | null
          zipcode?: string | null
        }
      }
      client_input_tool: {
        Row: {
          created_at: string | null
          data: Json | null
          extra: Json | null
          id: string
          member_area_tool_id: string | null
          profile_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          extra?: Json | null
          id?: string
          member_area_tool_id?: string | null
          profile_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          extra?: Json | null
          id?: string
          member_area_tool_id?: string | null
          profile_id?: string | null
        }
      }
      client_product: {
        Row: {
          approved: boolean
          created_at: string | null
          finishedAt: string | null
          id: string
          interval: string | null
          product_id: string
          subscription: boolean | null
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          approved?: boolean
          created_at?: string | null
          finishedAt?: string | null
          id?: string
          interval?: string | null
          product_id: string
          subscription?: boolean | null
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          approved?: boolean
          created_at?: string | null
          finishedAt?: string | null
          id?: string
          interval?: string | null
          product_id?: string
          subscription?: boolean | null
          subscription_id?: string | null
          user_id?: string
        }
      }
      directus_activity: {
        Row: {
          action: string
          collection: string
          comment: string | null
          id: number
          ip: string | null
          item: string
          origin: string | null
          timestamp: string
          user: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          collection: string
          comment?: string | null
          id?: number
          ip?: string | null
          item: string
          origin?: string | null
          timestamp?: string
          user?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          collection?: string
          comment?: string | null
          id?: number
          ip?: string | null
          item?: string
          origin?: string | null
          timestamp?: string
          user?: string | null
          user_agent?: string | null
        }
      }
      directus_collections: {
        Row: {
          accountability: string | null
          archive_app_filter: boolean
          archive_field: string | null
          archive_value: string | null
          collapse: string
          collection: string
          color: string | null
          display_template: string | null
          group: string | null
          hidden: boolean
          icon: string | null
          item_duplication_fields: Json | null
          note: string | null
          singleton: boolean
          sort: number | null
          sort_field: string | null
          translations: Json | null
          unarchive_value: string | null
        }
        Insert: {
          accountability?: string | null
          archive_app_filter?: boolean
          archive_field?: string | null
          archive_value?: string | null
          collapse?: string
          collection: string
          color?: string | null
          display_template?: string | null
          group?: string | null
          hidden?: boolean
          icon?: string | null
          item_duplication_fields?: Json | null
          note?: string | null
          singleton?: boolean
          sort?: number | null
          sort_field?: string | null
          translations?: Json | null
          unarchive_value?: string | null
        }
        Update: {
          accountability?: string | null
          archive_app_filter?: boolean
          archive_field?: string | null
          archive_value?: string | null
          collapse?: string
          collection?: string
          color?: string | null
          display_template?: string | null
          group?: string | null
          hidden?: boolean
          icon?: string | null
          item_duplication_fields?: Json | null
          note?: string | null
          singleton?: boolean
          sort?: number | null
          sort_field?: string | null
          translations?: Json | null
          unarchive_value?: string | null
        }
      }
      directus_dashboards: {
        Row: {
          color: string | null
          date_created: string | null
          icon: string
          id: string
          name: string
          note: string | null
          user_created: string | null
        }
        Insert: {
          color?: string | null
          date_created?: string | null
          icon?: string
          id: string
          name: string
          note?: string | null
          user_created?: string | null
        }
        Update: {
          color?: string | null
          date_created?: string | null
          icon?: string
          id?: string
          name?: string
          note?: string | null
          user_created?: string | null
        }
      }
      directus_fields: {
        Row: {
          collection: string
          conditions: Json | null
          display: string | null
          display_options: Json | null
          field: string
          group: string | null
          hidden: boolean
          id: number
          interface: string | null
          note: string | null
          options: Json | null
          readonly: boolean
          required: boolean | null
          sort: number | null
          special: string | null
          translations: Json | null
          validation: Json | null
          validation_message: string | null
          width: string | null
        }
        Insert: {
          collection: string
          conditions?: Json | null
          display?: string | null
          display_options?: Json | null
          field: string
          group?: string | null
          hidden?: boolean
          id?: number
          interface?: string | null
          note?: string | null
          options?: Json | null
          readonly?: boolean
          required?: boolean | null
          sort?: number | null
          special?: string | null
          translations?: Json | null
          validation?: Json | null
          validation_message?: string | null
          width?: string | null
        }
        Update: {
          collection?: string
          conditions?: Json | null
          display?: string | null
          display_options?: Json | null
          field?: string
          group?: string | null
          hidden?: boolean
          id?: number
          interface?: string | null
          note?: string | null
          options?: Json | null
          readonly?: boolean
          required?: boolean | null
          sort?: number | null
          special?: string | null
          translations?: Json | null
          validation?: Json | null
          validation_message?: string | null
          width?: string | null
        }
      }
      directus_files: {
        Row: {
          charset: string | null
          description: string | null
          duration: number | null
          embed: string | null
          filename_disk: string | null
          filename_download: string
          filesize: number | null
          folder: string | null
          height: number | null
          id: string
          location: string | null
          metadata: Json | null
          modified_by: string | null
          modified_on: string
          storage: string
          tags: string | null
          title: string | null
          type: string | null
          uploaded_by: string | null
          uploaded_on: string
          width: number | null
        }
        Insert: {
          charset?: string | null
          description?: string | null
          duration?: number | null
          embed?: string | null
          filename_disk?: string | null
          filename_download: string
          filesize?: number | null
          folder?: string | null
          height?: number | null
          id: string
          location?: string | null
          metadata?: Json | null
          modified_by?: string | null
          modified_on?: string
          storage: string
          tags?: string | null
          title?: string | null
          type?: string | null
          uploaded_by?: string | null
          uploaded_on?: string
          width?: number | null
        }
        Update: {
          charset?: string | null
          description?: string | null
          duration?: number | null
          embed?: string | null
          filename_disk?: string | null
          filename_download?: string
          filesize?: number | null
          folder?: string | null
          height?: number | null
          id?: string
          location?: string | null
          metadata?: Json | null
          modified_by?: string | null
          modified_on?: string
          storage?: string
          tags?: string | null
          title?: string | null
          type?: string | null
          uploaded_by?: string | null
          uploaded_on?: string
          width?: number | null
        }
      }
      directus_flows: {
        Row: {
          accountability: string | null
          color: string | null
          date_created: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          operation: string | null
          options: Json | null
          status: string
          trigger: string | null
          user_created: string | null
        }
        Insert: {
          accountability?: string | null
          color?: string | null
          date_created?: string | null
          description?: string | null
          icon?: string | null
          id: string
          name: string
          operation?: string | null
          options?: Json | null
          status?: string
          trigger?: string | null
          user_created?: string | null
        }
        Update: {
          accountability?: string | null
          color?: string | null
          date_created?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          operation?: string | null
          options?: Json | null
          status?: string
          trigger?: string | null
          user_created?: string | null
        }
      }
      directus_folders: {
        Row: {
          id: string
          name: string
          parent: string | null
        }
        Insert: {
          id: string
          name: string
          parent?: string | null
        }
        Update: {
          id?: string
          name?: string
          parent?: string | null
        }
      }
      directus_migrations: {
        Row: {
          name: string
          timestamp: string | null
          version: string
        }
        Insert: {
          name: string
          timestamp?: string | null
          version: string
        }
        Update: {
          name?: string
          timestamp?: string | null
          version?: string
        }
      }
      directus_notifications: {
        Row: {
          collection: string | null
          id: number
          item: string | null
          message: string | null
          recipient: string
          sender: string | null
          status: string | null
          subject: string
          timestamp: string | null
        }
        Insert: {
          collection?: string | null
          id?: number
          item?: string | null
          message?: string | null
          recipient: string
          sender?: string | null
          status?: string | null
          subject: string
          timestamp?: string | null
        }
        Update: {
          collection?: string | null
          id?: number
          item?: string | null
          message?: string | null
          recipient?: string
          sender?: string | null
          status?: string | null
          subject?: string
          timestamp?: string | null
        }
      }
      directus_operations: {
        Row: {
          date_created: string | null
          flow: string
          id: string
          key: string
          name: string | null
          options: Json | null
          position_x: number
          position_y: number
          reject: string | null
          resolve: string | null
          type: string
          user_created: string | null
        }
        Insert: {
          date_created?: string | null
          flow: string
          id: string
          key: string
          name?: string | null
          options?: Json | null
          position_x: number
          position_y: number
          reject?: string | null
          resolve?: string | null
          type: string
          user_created?: string | null
        }
        Update: {
          date_created?: string | null
          flow?: string
          id?: string
          key?: string
          name?: string | null
          options?: Json | null
          position_x?: number
          position_y?: number
          reject?: string | null
          resolve?: string | null
          type?: string
          user_created?: string | null
        }
      }
      directus_panels: {
        Row: {
          color: string | null
          dashboard: string
          date_created: string | null
          height: number
          icon: string | null
          id: string
          name: string | null
          note: string | null
          options: Json | null
          position_x: number
          position_y: number
          show_header: boolean
          type: string
          user_created: string | null
          width: number
        }
        Insert: {
          color?: string | null
          dashboard: string
          date_created?: string | null
          height: number
          icon?: string | null
          id: string
          name?: string | null
          note?: string | null
          options?: Json | null
          position_x: number
          position_y: number
          show_header?: boolean
          type: string
          user_created?: string | null
          width: number
        }
        Update: {
          color?: string | null
          dashboard?: string
          date_created?: string | null
          height?: number
          icon?: string | null
          id?: string
          name?: string | null
          note?: string | null
          options?: Json | null
          position_x?: number
          position_y?: number
          show_header?: boolean
          type?: string
          user_created?: string | null
          width?: number
        }
      }
      directus_permissions: {
        Row: {
          action: string
          collection: string
          fields: string | null
          id: number
          permissions: Json | null
          presets: Json | null
          role: string | null
          validation: Json | null
        }
        Insert: {
          action: string
          collection: string
          fields?: string | null
          id?: number
          permissions?: Json | null
          presets?: Json | null
          role?: string | null
          validation?: Json | null
        }
        Update: {
          action?: string
          collection?: string
          fields?: string | null
          id?: number
          permissions?: Json | null
          presets?: Json | null
          role?: string | null
          validation?: Json | null
        }
      }
      directus_presets: {
        Row: {
          bookmark: string | null
          collection: string | null
          color: string | null
          filter: Json | null
          icon: string
          id: number
          layout: string | null
          layout_options: Json | null
          layout_query: Json | null
          refresh_interval: number | null
          role: string | null
          search: string | null
          user: string | null
        }
        Insert: {
          bookmark?: string | null
          collection?: string | null
          color?: string | null
          filter?: Json | null
          icon?: string
          id?: number
          layout?: string | null
          layout_options?: Json | null
          layout_query?: Json | null
          refresh_interval?: number | null
          role?: string | null
          search?: string | null
          user?: string | null
        }
        Update: {
          bookmark?: string | null
          collection?: string | null
          color?: string | null
          filter?: Json | null
          icon?: string
          id?: number
          layout?: string | null
          layout_options?: Json | null
          layout_query?: Json | null
          refresh_interval?: number | null
          role?: string | null
          search?: string | null
          user?: string | null
        }
      }
      directus_relations: {
        Row: {
          id: number
          junction_field: string | null
          many_collection: string
          many_field: string
          one_allowed_collections: string | null
          one_collection: string | null
          one_collection_field: string | null
          one_deselect_action: string
          one_field: string | null
          sort_field: string | null
        }
        Insert: {
          id?: number
          junction_field?: string | null
          many_collection: string
          many_field: string
          one_allowed_collections?: string | null
          one_collection?: string | null
          one_collection_field?: string | null
          one_deselect_action?: string
          one_field?: string | null
          sort_field?: string | null
        }
        Update: {
          id?: number
          junction_field?: string | null
          many_collection?: string
          many_field?: string
          one_allowed_collections?: string | null
          one_collection?: string | null
          one_collection_field?: string | null
          one_deselect_action?: string
          one_field?: string | null
          sort_field?: string | null
        }
      }
      directus_revisions: {
        Row: {
          activity: number
          collection: string
          data: Json | null
          delta: Json | null
          id: number
          item: string
          parent: number | null
        }
        Insert: {
          activity: number
          collection: string
          data?: Json | null
          delta?: Json | null
          id?: number
          item: string
          parent?: number | null
        }
        Update: {
          activity?: number
          collection?: string
          data?: Json | null
          delta?: Json | null
          id?: number
          item?: string
          parent?: number | null
        }
      }
      directus_roles: {
        Row: {
          admin_access: boolean
          app_access: boolean
          description: string | null
          enforce_tfa: boolean
          icon: string
          id: string
          ip_access: string | null
          name: string
        }
        Insert: {
          admin_access?: boolean
          app_access?: boolean
          description?: string | null
          enforce_tfa?: boolean
          icon?: string
          id: string
          ip_access?: string | null
          name: string
        }
        Update: {
          admin_access?: boolean
          app_access?: boolean
          description?: string | null
          enforce_tfa?: boolean
          icon?: string
          id?: string
          ip_access?: string | null
          name?: string
        }
      }
      directus_sessions: {
        Row: {
          expires: string
          ip: string | null
          origin: string | null
          share: string | null
          token: string
          user: string | null
          user_agent: string | null
        }
        Insert: {
          expires: string
          ip?: string | null
          origin?: string | null
          share?: string | null
          token: string
          user?: string | null
          user_agent?: string | null
        }
        Update: {
          expires?: string
          ip?: string | null
          origin?: string | null
          share?: string | null
          token?: string
          user?: string | null
          user_agent?: string | null
        }
      }
      directus_settings: {
        Row: {
          auth_login_attempts: number | null
          auth_password_policy: string | null
          basemaps: Json | null
          custom_aspect_ratios: Json | null
          custom_css: string | null
          default_language: string
          id: number
          mapbox_key: string | null
          module_bar: Json | null
          project_color: string | null
          project_descriptor: string | null
          project_logo: string | null
          project_name: string
          project_url: string | null
          public_background: string | null
          public_foreground: string | null
          public_note: string | null
          storage_asset_presets: Json | null
          storage_asset_transform: string | null
          storage_default_folder: string | null
          translation_strings: Json | null
        }
        Insert: {
          auth_login_attempts?: number | null
          auth_password_policy?: string | null
          basemaps?: Json | null
          custom_aspect_ratios?: Json | null
          custom_css?: string | null
          default_language?: string
          id?: number
          mapbox_key?: string | null
          module_bar?: Json | null
          project_color?: string | null
          project_descriptor?: string | null
          project_logo?: string | null
          project_name?: string
          project_url?: string | null
          public_background?: string | null
          public_foreground?: string | null
          public_note?: string | null
          storage_asset_presets?: Json | null
          storage_asset_transform?: string | null
          storage_default_folder?: string | null
          translation_strings?: Json | null
        }
        Update: {
          auth_login_attempts?: number | null
          auth_password_policy?: string | null
          basemaps?: Json | null
          custom_aspect_ratios?: Json | null
          custom_css?: string | null
          default_language?: string
          id?: number
          mapbox_key?: string | null
          module_bar?: Json | null
          project_color?: string | null
          project_descriptor?: string | null
          project_logo?: string | null
          project_name?: string
          project_url?: string | null
          public_background?: string | null
          public_foreground?: string | null
          public_note?: string | null
          storage_asset_presets?: Json | null
          storage_asset_transform?: string | null
          storage_default_folder?: string | null
          translation_strings?: Json | null
        }
      }
      directus_shares: {
        Row: {
          collection: string | null
          date_created: string | null
          date_end: string | null
          date_start: string | null
          id: string
          item: string | null
          max_uses: number | null
          name: string | null
          password: string | null
          role: string | null
          times_used: number | null
          user_created: string | null
        }
        Insert: {
          collection?: string | null
          date_created?: string | null
          date_end?: string | null
          date_start?: string | null
          id: string
          item?: string | null
          max_uses?: number | null
          name?: string | null
          password?: string | null
          role?: string | null
          times_used?: number | null
          user_created?: string | null
        }
        Update: {
          collection?: string | null
          date_created?: string | null
          date_end?: string | null
          date_start?: string | null
          id?: string
          item?: string | null
          max_uses?: number | null
          name?: string | null
          password?: string | null
          role?: string | null
          times_used?: number | null
          user_created?: string | null
        }
      }
      directus_users: {
        Row: {
          auth_data: Json | null
          avatar: string | null
          description: string | null
          email: string | null
          email_notifications: boolean | null
          external_identifier: string | null
          first_name: string | null
          id: string
          language: string | null
          last_access: string | null
          last_name: string | null
          last_page: string | null
          location: string | null
          password: string | null
          provider: string
          role: string | null
          status: string
          tags: Json | null
          tfa_secret: string | null
          theme: string | null
          title: string | null
          token: string | null
        }
        Insert: {
          auth_data?: Json | null
          avatar?: string | null
          description?: string | null
          email?: string | null
          email_notifications?: boolean | null
          external_identifier?: string | null
          first_name?: string | null
          id: string
          language?: string | null
          last_access?: string | null
          last_name?: string | null
          last_page?: string | null
          location?: string | null
          password?: string | null
          provider?: string
          role?: string | null
          status?: string
          tags?: Json | null
          tfa_secret?: string | null
          theme?: string | null
          title?: string | null
          token?: string | null
        }
        Update: {
          auth_data?: Json | null
          avatar?: string | null
          description?: string | null
          email?: string | null
          email_notifications?: boolean | null
          external_identifier?: string | null
          first_name?: string | null
          id?: string
          language?: string | null
          last_access?: string | null
          last_name?: string | null
          last_page?: string | null
          location?: string | null
          password?: string | null
          provider?: string
          role?: string | null
          status?: string
          tags?: Json | null
          tfa_secret?: string | null
          theme?: string | null
          title?: string | null
          token?: string | null
        }
      }
      directus_webhooks: {
        Row: {
          actions: string
          collections: string
          data: boolean
          headers: Json | null
          id: number
          method: string
          name: string
          status: string
          url: string
        }
        Insert: {
          actions: string
          collections: string
          data?: boolean
          headers?: Json | null
          id?: number
          method?: string
          name: string
          status?: string
          url: string
        }
        Update: {
          actions?: string
          collections?: string
          data?: boolean
          headers?: Json | null
          id?: number
          method?: string
          name?: string
          status?: string
          url?: string
        }
      }
      integration_token: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          token: string
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          token: string
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          token?: string
          type?: string
        }
      }
      lead_approval: {
        Row: {
          comments: string | null
          date_created: string | null
          date_updated: string | null
          email: string | null
          fullname: string | null
          id: string
          phone: string | null
          status: string | null
          trial_expiration: string | null
        }
        Insert: {
          comments?: string | null
          date_created?: string | null
          date_updated?: string | null
          email?: string | null
          fullname?: string | null
          id?: string
          phone?: string | null
          status?: string | null
          trial_expiration?: string | null
        }
        Update: {
          comments?: string | null
          date_created?: string | null
          date_updated?: string | null
          email?: string | null
          fullname?: string | null
          id?: string
          phone?: string | null
          status?: string | null
          trial_expiration?: string | null
        }
      }
      log_type: {
        Row: {
          code: number
          created_at: string | null
          description: string | null
          title: string | null
        }
        Insert: {
          code: number
          created_at?: string | null
          description?: string | null
          title?: string | null
        }
        Update: {
          code?: number
          created_at?: string | null
          description?: string | null
          title?: string | null
        }
      }
      member_area: {
        Row: {
          created_at: string | null
          id: string
          type_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          type_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          type_id?: number | null
        }
      }
      member_area_files: {
        Row: {
          created_at: string | null
          id: string
          ref_id: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          ref_id: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          ref_id?: string
          url?: string
        }
      }
      member_area_tool: {
        Row: {
          created_at: string | null
          data: Json | null
          description: string | null
          extra: Json | null
          id: string
          member_area: string | null
          order: number | null
          parent: string | null
          status: boolean | null
          title: string | null
          type: number
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          description?: string | null
          extra?: Json | null
          id?: string
          member_area?: string | null
          order?: number | null
          parent?: string | null
          status?: boolean | null
          title?: string | null
          type: number
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          description?: string | null
          extra?: Json | null
          id?: string
          member_area?: string | null
          order?: number | null
          parent?: string | null
          status?: boolean | null
          title?: string | null
          type?: number
        }
      }
      member_area_type: {
        Row: {
          created_at: string | null
          id: number
          image: string | null
          name: string
          path: string | null
          tooltypes: number[] | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image?: string | null
          name: string
          path?: string | null
          tooltypes?: number[] | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image?: string | null
          name?: string
          path?: string | null
          tooltypes?: number[] | null
        }
      }
      mentor_tool: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image: string | null
          name: string
          order: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          name: string
          order?: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          name?: string
          order?: number
        }
      }
      product: {
        Row: {
          access_link: string | null
          banner_image: string | null
          certificate: Json | null
          contact: string | null
          created_at: string | null
          deliver: string | null
          description: string | null
          extra: Json | null
          extra_image: string | null
          id: string
          main_image: string | null
          member_area: string | null
          owner: string
          price: number
          refeerer: string | null
          status: boolean | null
          title: string
          video: string | null
        }
        Insert: {
          access_link?: string | null
          banner_image?: string | null
          certificate?: Json | null
          contact?: string | null
          created_at?: string | null
          deliver?: string | null
          description?: string | null
          extra?: Json | null
          extra_image?: string | null
          id?: string
          main_image?: string | null
          member_area?: string | null
          owner: string
          price?: number
          refeerer?: string | null
          status?: boolean | null
          title: string
          video?: string | null
        }
        Update: {
          access_link?: string | null
          banner_image?: string | null
          certificate?: Json | null
          contact?: string | null
          created_at?: string | null
          deliver?: string | null
          description?: string | null
          extra?: Json | null
          extra_image?: string | null
          id?: string
          main_image?: string | null
          member_area?: string | null
          owner?: string
          price?: number
          refeerer?: string | null
          status?: boolean | null
          title?: string
          video?: string | null
        }
      }
      profile: {
        Row: {
          access_type: string | null
          active: boolean | null
          avatar: string | null
          card_id: string | null
          created_at: string | null
          customer_id: string | null
          document: string | null
          email: string | null
          expiration_date: string | null
          id: string
          interval: string | null
          lead_id: string | null
          name: string | null
          phone: string | null
          plan: string | null
          plan_id: string | null
          subscription_id: string | null
        }
        Insert: {
          access_type?: string | null
          active?: boolean | null
          avatar?: string | null
          card_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          document?: string | null
          email?: string | null
          expiration_date?: string | null
          id: string
          interval?: string | null
          lead_id?: string | null
          name?: string | null
          phone?: string | null
          plan?: string | null
          plan_id?: string | null
          subscription_id?: string | null
        }
        Update: {
          access_type?: string | null
          active?: boolean | null
          avatar?: string | null
          card_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          document?: string | null
          email?: string | null
          expiration_date?: string | null
          id?: string
          interval?: string | null
          lead_id?: string | null
          name?: string | null
          phone?: string | null
          plan?: string | null
          plan_id?: string | null
          subscription_id?: string | null
        }
      }
      profile_history: {
        Row: {
          code: number | null
          created_at: string | null
          description: string | null
          extra: Json | null
          id: string
          profile_id: string | null
          visibility: number | null
        }
        Insert: {
          code?: number | null
          created_at?: string | null
          description?: string | null
          extra?: Json | null
          id?: string
          profile_id?: string | null
          visibility?: number | null
        }
        Update: {
          code?: number | null
          created_at?: string | null
          description?: string | null
          extra?: Json | null
          id?: string
          profile_id?: string | null
          visibility?: number | null
        }
      }
      team: {
        Row: {
          created_at: string | null
          id: string
          owner_id: string
          products: string[]
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          owner_id: string
          products?: string[]
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          owner_id?: string
          products?: string[]
          title?: string
        }
      }
      team_member: {
        Row: {
          created_at: string | null
          id: string
          profile_id: string
          team_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile_id: string
          team_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_id?: string
          team_id?: string
        }
      }
      team_member_client: {
        Row: {
          created_at: string | null
          id: number
          profile_id: string
          role: string
          team_member_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          profile_id: string
          role: string
          team_member_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          profile_id?: string
          role?: string
          team_member_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
