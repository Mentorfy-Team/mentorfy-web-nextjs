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
          id: string
          created_at: string | null
          zipcode: string | null
          street: string | null
          number: number | null
          complement: string | null
          neighborhood: string | null
          city: string | null
          state: string | null
          country: string | null
        }
        Insert: {
          id: string
          created_at?: string | null
          zipcode?: string | null
          street?: string | null
          number?: number | null
          complement?: string | null
          neighborhood?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          zipcode?: string | null
          street?: string | null
          number?: number | null
          complement?: string | null
          neighborhood?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
        }
      }
      client_input_tool: {
        Row: {
          id: string
          created_at: string | null
          profile_id: string | null
          member_area_tool_id: string | null
          data: Json | null
          extra: Json | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          profile_id?: string | null
          member_area_tool_id?: string | null
          data?: Json | null
          extra?: Json | null
        }
        Update: {
          id?: string
          created_at?: string | null
          profile_id?: string | null
          member_area_tool_id?: string | null
          data?: Json | null
          extra?: Json | null
        }
      }
      client_product: {
        Row: {
          user_id: string
          product_id: string
          created_at: string | null
          id: string
          subscription: boolean | null
          interval: string | null
          approved: boolean
          finishedAt: string | null
        }
        Insert: {
          user_id: string
          product_id: string
          created_at?: string | null
          id?: string
          subscription?: boolean | null
          interval?: string | null
          approved?: boolean
          finishedAt?: string | null
        }
        Update: {
          user_id?: string
          product_id?: string
          created_at?: string | null
          id?: string
          subscription?: boolean | null
          interval?: string | null
          approved?: boolean
          finishedAt?: string | null
        }
      }
      directus_activity: {
        Row: {
          id: number
          action: string
          user: string | null
          timestamp: string
          ip: string | null
          user_agent: string | null
          collection: string
          item: string
          comment: string | null
          origin: string | null
        }
        Insert: {
          id?: number
          action: string
          user?: string | null
          timestamp?: string
          ip?: string | null
          user_agent?: string | null
          collection: string
          item: string
          comment?: string | null
          origin?: string | null
        }
        Update: {
          id?: number
          action?: string
          user?: string | null
          timestamp?: string
          ip?: string | null
          user_agent?: string | null
          collection?: string
          item?: string
          comment?: string | null
          origin?: string | null
        }
      }
      directus_collections: {
        Row: {
          collection: string
          icon: string | null
          note: string | null
          display_template: string | null
          hidden: boolean
          singleton: boolean
          translations: Json | null
          archive_field: string | null
          archive_app_filter: boolean
          archive_value: string | null
          unarchive_value: string | null
          sort_field: string | null
          accountability: string | null
          color: string | null
          item_duplication_fields: Json | null
          sort: number | null
          group: string | null
          collapse: string
        }
        Insert: {
          collection: string
          icon?: string | null
          note?: string | null
          display_template?: string | null
          hidden?: boolean
          singleton?: boolean
          translations?: Json | null
          archive_field?: string | null
          archive_app_filter?: boolean
          archive_value?: string | null
          unarchive_value?: string | null
          sort_field?: string | null
          accountability?: string | null
          color?: string | null
          item_duplication_fields?: Json | null
          sort?: number | null
          group?: string | null
          collapse?: string
        }
        Update: {
          collection?: string
          icon?: string | null
          note?: string | null
          display_template?: string | null
          hidden?: boolean
          singleton?: boolean
          translations?: Json | null
          archive_field?: string | null
          archive_app_filter?: boolean
          archive_value?: string | null
          unarchive_value?: string | null
          sort_field?: string | null
          accountability?: string | null
          color?: string | null
          item_duplication_fields?: Json | null
          sort?: number | null
          group?: string | null
          collapse?: string
        }
      }
      directus_dashboards: {
        Row: {
          id: string
          name: string
          icon: string
          note: string | null
          date_created: string | null
          user_created: string | null
          color: string | null
        }
        Insert: {
          id: string
          name: string
          icon?: string
          note?: string | null
          date_created?: string | null
          user_created?: string | null
          color?: string | null
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          note?: string | null
          date_created?: string | null
          user_created?: string | null
          color?: string | null
        }
      }
      directus_fields: {
        Row: {
          id: number
          collection: string
          field: string
          special: string | null
          interface: string | null
          options: Json | null
          display: string | null
          display_options: Json | null
          readonly: boolean
          hidden: boolean
          sort: number | null
          width: string | null
          translations: Json | null
          note: string | null
          conditions: Json | null
          required: boolean | null
          group: string | null
          validation: Json | null
          validation_message: string | null
        }
        Insert: {
          id?: number
          collection: string
          field: string
          special?: string | null
          interface?: string | null
          options?: Json | null
          display?: string | null
          display_options?: Json | null
          readonly?: boolean
          hidden?: boolean
          sort?: number | null
          width?: string | null
          translations?: Json | null
          note?: string | null
          conditions?: Json | null
          required?: boolean | null
          group?: string | null
          validation?: Json | null
          validation_message?: string | null
        }
        Update: {
          id?: number
          collection?: string
          field?: string
          special?: string | null
          interface?: string | null
          options?: Json | null
          display?: string | null
          display_options?: Json | null
          readonly?: boolean
          hidden?: boolean
          sort?: number | null
          width?: string | null
          translations?: Json | null
          note?: string | null
          conditions?: Json | null
          required?: boolean | null
          group?: string | null
          validation?: Json | null
          validation_message?: string | null
        }
      }
      directus_files: {
        Row: {
          id: string
          storage: string
          filename_disk: string | null
          filename_download: string
          title: string | null
          type: string | null
          folder: string | null
          uploaded_by: string | null
          uploaded_on: string
          modified_by: string | null
          modified_on: string
          charset: string | null
          filesize: number | null
          width: number | null
          height: number | null
          duration: number | null
          embed: string | null
          description: string | null
          location: string | null
          tags: string | null
          metadata: Json | null
        }
        Insert: {
          id: string
          storage: string
          filename_disk?: string | null
          filename_download: string
          title?: string | null
          type?: string | null
          folder?: string | null
          uploaded_by?: string | null
          uploaded_on?: string
          modified_by?: string | null
          modified_on?: string
          charset?: string | null
          filesize?: number | null
          width?: number | null
          height?: number | null
          duration?: number | null
          embed?: string | null
          description?: string | null
          location?: string | null
          tags?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          storage?: string
          filename_disk?: string | null
          filename_download?: string
          title?: string | null
          type?: string | null
          folder?: string | null
          uploaded_by?: string | null
          uploaded_on?: string
          modified_by?: string | null
          modified_on?: string
          charset?: string | null
          filesize?: number | null
          width?: number | null
          height?: number | null
          duration?: number | null
          embed?: string | null
          description?: string | null
          location?: string | null
          tags?: string | null
          metadata?: Json | null
        }
      }
      directus_flows: {
        Row: {
          id: string
          name: string
          icon: string | null
          color: string | null
          description: string | null
          status: string
          trigger: string | null
          accountability: string | null
          options: Json | null
          operation: string | null
          date_created: string | null
          user_created: string | null
        }
        Insert: {
          id: string
          name: string
          icon?: string | null
          color?: string | null
          description?: string | null
          status?: string
          trigger?: string | null
          accountability?: string | null
          options?: Json | null
          operation?: string | null
          date_created?: string | null
          user_created?: string | null
        }
        Update: {
          id?: string
          name?: string
          icon?: string | null
          color?: string | null
          description?: string | null
          status?: string
          trigger?: string | null
          accountability?: string | null
          options?: Json | null
          operation?: string | null
          date_created?: string | null
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
          version: string
          name: string
          timestamp: string | null
        }
        Insert: {
          version: string
          name: string
          timestamp?: string | null
        }
        Update: {
          version?: string
          name?: string
          timestamp?: string | null
        }
      }
      directus_notifications: {
        Row: {
          id: number
          timestamp: string | null
          status: string | null
          recipient: string
          sender: string | null
          subject: string
          message: string | null
          collection: string | null
          item: string | null
        }
        Insert: {
          id?: number
          timestamp?: string | null
          status?: string | null
          recipient: string
          sender?: string | null
          subject: string
          message?: string | null
          collection?: string | null
          item?: string | null
        }
        Update: {
          id?: number
          timestamp?: string | null
          status?: string | null
          recipient?: string
          sender?: string | null
          subject?: string
          message?: string | null
          collection?: string | null
          item?: string | null
        }
      }
      directus_operations: {
        Row: {
          id: string
          name: string | null
          key: string
          type: string
          position_x: number
          position_y: number
          options: Json | null
          resolve: string | null
          reject: string | null
          flow: string
          date_created: string | null
          user_created: string | null
        }
        Insert: {
          id: string
          name?: string | null
          key: string
          type: string
          position_x: number
          position_y: number
          options?: Json | null
          resolve?: string | null
          reject?: string | null
          flow: string
          date_created?: string | null
          user_created?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          key?: string
          type?: string
          position_x?: number
          position_y?: number
          options?: Json | null
          resolve?: string | null
          reject?: string | null
          flow?: string
          date_created?: string | null
          user_created?: string | null
        }
      }
      directus_panels: {
        Row: {
          id: string
          dashboard: string
          name: string | null
          icon: string | null
          color: string | null
          show_header: boolean
          note: string | null
          type: string
          position_x: number
          position_y: number
          width: number
          height: number
          options: Json | null
          date_created: string | null
          user_created: string | null
        }
        Insert: {
          id: string
          dashboard: string
          name?: string | null
          icon?: string | null
          color?: string | null
          show_header?: boolean
          note?: string | null
          type: string
          position_x: number
          position_y: number
          width: number
          height: number
          options?: Json | null
          date_created?: string | null
          user_created?: string | null
        }
        Update: {
          id?: string
          dashboard?: string
          name?: string | null
          icon?: string | null
          color?: string | null
          show_header?: boolean
          note?: string | null
          type?: string
          position_x?: number
          position_y?: number
          width?: number
          height?: number
          options?: Json | null
          date_created?: string | null
          user_created?: string | null
        }
      }
      directus_permissions: {
        Row: {
          id: number
          role: string | null
          collection: string
          action: string
          permissions: Json | null
          validation: Json | null
          presets: Json | null
          fields: string | null
        }
        Insert: {
          id?: number
          role?: string | null
          collection: string
          action: string
          permissions?: Json | null
          validation?: Json | null
          presets?: Json | null
          fields?: string | null
        }
        Update: {
          id?: number
          role?: string | null
          collection?: string
          action?: string
          permissions?: Json | null
          validation?: Json | null
          presets?: Json | null
          fields?: string | null
        }
      }
      directus_presets: {
        Row: {
          id: number
          bookmark: string | null
          user: string | null
          role: string | null
          collection: string | null
          search: string | null
          layout: string | null
          layout_query: Json | null
          layout_options: Json | null
          refresh_interval: number | null
          filter: Json | null
          icon: string
          color: string | null
        }
        Insert: {
          id?: number
          bookmark?: string | null
          user?: string | null
          role?: string | null
          collection?: string | null
          search?: string | null
          layout?: string | null
          layout_query?: Json | null
          layout_options?: Json | null
          refresh_interval?: number | null
          filter?: Json | null
          icon?: string
          color?: string | null
        }
        Update: {
          id?: number
          bookmark?: string | null
          user?: string | null
          role?: string | null
          collection?: string | null
          search?: string | null
          layout?: string | null
          layout_query?: Json | null
          layout_options?: Json | null
          refresh_interval?: number | null
          filter?: Json | null
          icon?: string
          color?: string | null
        }
      }
      directus_relations: {
        Row: {
          id: number
          many_collection: string
          many_field: string
          one_collection: string | null
          one_field: string | null
          one_collection_field: string | null
          one_allowed_collections: string | null
          junction_field: string | null
          sort_field: string | null
          one_deselect_action: string
        }
        Insert: {
          id?: number
          many_collection: string
          many_field: string
          one_collection?: string | null
          one_field?: string | null
          one_collection_field?: string | null
          one_allowed_collections?: string | null
          junction_field?: string | null
          sort_field?: string | null
          one_deselect_action?: string
        }
        Update: {
          id?: number
          many_collection?: string
          many_field?: string
          one_collection?: string | null
          one_field?: string | null
          one_collection_field?: string | null
          one_allowed_collections?: string | null
          junction_field?: string | null
          sort_field?: string | null
          one_deselect_action?: string
        }
      }
      directus_revisions: {
        Row: {
          id: number
          activity: number
          collection: string
          item: string
          data: Json | null
          delta: Json | null
          parent: number | null
        }
        Insert: {
          id?: number
          activity: number
          collection: string
          item: string
          data?: Json | null
          delta?: Json | null
          parent?: number | null
        }
        Update: {
          id?: number
          activity?: number
          collection?: string
          item?: string
          data?: Json | null
          delta?: Json | null
          parent?: number | null
        }
      }
      directus_roles: {
        Row: {
          id: string
          name: string
          icon: string
          description: string | null
          ip_access: string | null
          enforce_tfa: boolean
          admin_access: boolean
          app_access: boolean
        }
        Insert: {
          id: string
          name: string
          icon?: string
          description?: string | null
          ip_access?: string | null
          enforce_tfa?: boolean
          admin_access?: boolean
          app_access?: boolean
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          description?: string | null
          ip_access?: string | null
          enforce_tfa?: boolean
          admin_access?: boolean
          app_access?: boolean
        }
      }
      directus_sessions: {
        Row: {
          token: string
          user: string | null
          expires: string
          ip: string | null
          user_agent: string | null
          share: string | null
          origin: string | null
        }
        Insert: {
          token: string
          user?: string | null
          expires: string
          ip?: string | null
          user_agent?: string | null
          share?: string | null
          origin?: string | null
        }
        Update: {
          token?: string
          user?: string | null
          expires?: string
          ip?: string | null
          user_agent?: string | null
          share?: string | null
          origin?: string | null
        }
      }
      directus_settings: {
        Row: {
          id: number
          project_name: string
          project_url: string | null
          project_color: string | null
          project_logo: string | null
          public_foreground: string | null
          public_background: string | null
          public_note: string | null
          auth_login_attempts: number | null
          auth_password_policy: string | null
          storage_asset_transform: string | null
          storage_asset_presets: Json | null
          custom_css: string | null
          storage_default_folder: string | null
          basemaps: Json | null
          mapbox_key: string | null
          module_bar: Json | null
          project_descriptor: string | null
          translation_strings: Json | null
          default_language: string
          custom_aspect_ratios: Json | null
        }
        Insert: {
          id?: number
          project_name?: string
          project_url?: string | null
          project_color?: string | null
          project_logo?: string | null
          public_foreground?: string | null
          public_background?: string | null
          public_note?: string | null
          auth_login_attempts?: number | null
          auth_password_policy?: string | null
          storage_asset_transform?: string | null
          storage_asset_presets?: Json | null
          custom_css?: string | null
          storage_default_folder?: string | null
          basemaps?: Json | null
          mapbox_key?: string | null
          module_bar?: Json | null
          project_descriptor?: string | null
          translation_strings?: Json | null
          default_language?: string
          custom_aspect_ratios?: Json | null
        }
        Update: {
          id?: number
          project_name?: string
          project_url?: string | null
          project_color?: string | null
          project_logo?: string | null
          public_foreground?: string | null
          public_background?: string | null
          public_note?: string | null
          auth_login_attempts?: number | null
          auth_password_policy?: string | null
          storage_asset_transform?: string | null
          storage_asset_presets?: Json | null
          custom_css?: string | null
          storage_default_folder?: string | null
          basemaps?: Json | null
          mapbox_key?: string | null
          module_bar?: Json | null
          project_descriptor?: string | null
          translation_strings?: Json | null
          default_language?: string
          custom_aspect_ratios?: Json | null
        }
      }
      directus_shares: {
        Row: {
          id: string
          name: string | null
          collection: string | null
          item: string | null
          role: string | null
          password: string | null
          user_created: string | null
          date_created: string | null
          date_start: string | null
          date_end: string | null
          times_used: number | null
          max_uses: number | null
        }
        Insert: {
          id: string
          name?: string | null
          collection?: string | null
          item?: string | null
          role?: string | null
          password?: string | null
          user_created?: string | null
          date_created?: string | null
          date_start?: string | null
          date_end?: string | null
          times_used?: number | null
          max_uses?: number | null
        }
        Update: {
          id?: string
          name?: string | null
          collection?: string | null
          item?: string | null
          role?: string | null
          password?: string | null
          user_created?: string | null
          date_created?: string | null
          date_start?: string | null
          date_end?: string | null
          times_used?: number | null
          max_uses?: number | null
        }
      }
      directus_users: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          password: string | null
          location: string | null
          title: string | null
          description: string | null
          tags: Json | null
          avatar: string | null
          language: string | null
          theme: string | null
          tfa_secret: string | null
          status: string
          role: string | null
          token: string | null
          last_access: string | null
          last_page: string | null
          provider: string
          external_identifier: string | null
          auth_data: Json | null
          email_notifications: boolean | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          password?: string | null
          location?: string | null
          title?: string | null
          description?: string | null
          tags?: Json | null
          avatar?: string | null
          language?: string | null
          theme?: string | null
          tfa_secret?: string | null
          status?: string
          role?: string | null
          token?: string | null
          last_access?: string | null
          last_page?: string | null
          provider?: string
          external_identifier?: string | null
          auth_data?: Json | null
          email_notifications?: boolean | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          password?: string | null
          location?: string | null
          title?: string | null
          description?: string | null
          tags?: Json | null
          avatar?: string | null
          language?: string | null
          theme?: string | null
          tfa_secret?: string | null
          status?: string
          role?: string | null
          token?: string | null
          last_access?: string | null
          last_page?: string | null
          provider?: string
          external_identifier?: string | null
          auth_data?: Json | null
          email_notifications?: boolean | null
        }
      }
      directus_webhooks: {
        Row: {
          id: number
          name: string
          method: string
          url: string
          status: string
          data: boolean
          actions: string
          collections: string
          headers: Json | null
        }
        Insert: {
          id?: number
          name: string
          method?: string
          url: string
          status?: string
          data?: boolean
          actions: string
          collections: string
          headers?: Json | null
        }
        Update: {
          id?: number
          name?: string
          method?: string
          url?: string
          status?: string
          data?: boolean
          actions?: string
          collections?: string
          headers?: Json | null
        }
      }
      integration_token: {
        Row: {
          id: string
          product_id: string
          type: string
          created_at: string | null
          token: string
        }
        Insert: {
          id?: string
          product_id: string
          type: string
          created_at?: string | null
          token: string
        }
        Update: {
          id?: string
          product_id?: string
          type?: string
          created_at?: string | null
          token?: string
        }
      }
      lead_approval: {
        Row: {
          id: string
          status: string | null
          date_created: string | null
          date_updated: string | null
          fullname: string | null
          phone: string | null
          email: string | null
          comments: string | null
          expiration_date: string
        }
        Insert: {
          id: string
          status?: string | null
          date_created?: string | null
          date_updated?: string | null
          fullname?: string | null
          phone?: string | null
          email?: string | null
          comments?: string | null
          expiration_date: string
        }
        Update: {
          id?: string
          status?: string | null
          date_created?: string | null
          date_updated?: string | null
          fullname?: string | null
          phone?: string | null
          email?: string | null
          comments?: string | null
          expiration_date?: string
        }
      }
      log_type: {
        Row: {
          created_at: string | null
          title: string | null
          description: string | null
          code: number
        }
        Insert: {
          created_at?: string | null
          title?: string | null
          description?: string | null
          code: number
        }
        Update: {
          created_at?: string | null
          title?: string | null
          description?: string | null
          code?: number
        }
      }
      member_area: {
        Row: {
          id: string
          created_at: string | null
          type_id: number | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          type_id?: number | null
        }
        Update: {
          id?: string
          created_at?: string | null
          type_id?: number | null
        }
      }
      member_area_files: {
        Row: {
          id: string
          ref_id: string
          url: string
          created_at: string | null
        }
        Insert: {
          id?: string
          ref_id: string
          url: string
          created_at?: string | null
        }
        Update: {
          id?: string
          ref_id?: string
          url?: string
          created_at?: string | null
        }
      }
      member_area_tool: {
        Row: {
          id: string
          created_at: string | null
          member_area: string | null
          type: number
          title: string | null
          description: string | null
          status: boolean | null
          data: Json | null
          order: number | null
          extra: Json | null
          parent: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          member_area?: string | null
          type: number
          title?: string | null
          description?: string | null
          status?: boolean | null
          data?: Json | null
          order?: number | null
          extra?: Json | null
          parent?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          member_area?: string | null
          type?: number
          title?: string | null
          description?: string | null
          status?: boolean | null
          data?: Json | null
          order?: number | null
          extra?: Json | null
          parent?: string | null
        }
      }
      member_area_type: {
        Row: {
          id: number
          created_at: string | null
          name: string
          path: string | null
          tooltypes: number[] | null
          image: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name: string
          path?: string | null
          tooltypes?: number[] | null
          image?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string
          path?: string | null
          tooltypes?: number[] | null
          image?: string | null
        }
      }
      mentor_tool: {
        Row: {
          id: number
          created_at: string | null
          name: string
          description: string | null
          image: string | null
          order: number
        }
        Insert: {
          id?: number
          created_at?: string | null
          name: string
          description?: string | null
          image?: string | null
          order?: number
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string
          description?: string | null
          image?: string | null
          order?: number
        }
      }
      product: {
        Row: {
          owner: string
          created_at: string | null
          title: string
          description: string | null
          main_image: string | null
          banner_image: string | null
          price: number
          deliver: string | null
          status: boolean | null
          access_link: string | null
          id: string
          refeerer: string | null
          member_area: string | null
          video: string | null
          extra: Json | null
          extra_image: string | null
          certificate: Json | null
          contact: string | null
        }
        Insert: {
          owner: string
          created_at?: string | null
          title: string
          description?: string | null
          main_image?: string | null
          banner_image?: string | null
          price?: number
          deliver?: string | null
          status?: boolean | null
          access_link?: string | null
          id?: string
          refeerer?: string | null
          member_area?: string | null
          video?: string | null
          extra?: Json | null
          extra_image?: string | null
          certificate?: Json | null
          contact?: string | null
        }
        Update: {
          owner?: string
          created_at?: string | null
          title?: string
          description?: string | null
          main_image?: string | null
          banner_image?: string | null
          price?: number
          deliver?: string | null
          status?: boolean | null
          access_link?: string | null
          id?: string
          refeerer?: string | null
          member_area?: string | null
          video?: string | null
          extra?: Json | null
          extra_image?: string | null
          certificate?: Json | null
          contact?: string | null
        }
      }
      profile: {
        Row: {
          id: string
          created_at: string | null
          active: boolean | null
          interval: string | null
          name: string | null
          plan: string | null
          avatar: string | null
          access_type: string | null
          email: string | null
          phone: string | null
          expiration_date: string | null
          customer_id: string | null
          card_id: string | null
          plan_id: string | null
          subscription_id: string | null
        }
        Insert: {
          id: string
          created_at?: string | null
          active?: boolean | null
          interval?: string | null
          name?: string | null
          plan?: string | null
          avatar?: string | null
          access_type?: string | null
          email?: string | null
          phone?: string | null
          expiration_date?: string | null
          customer_id?: string | null
          card_id?: string | null
          plan_id?: string | null
          subscription_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          active?: boolean | null
          interval?: string | null
          name?: string | null
          plan?: string | null
          avatar?: string | null
          access_type?: string | null
          email?: string | null
          phone?: string | null
          expiration_date?: string | null
          customer_id?: string | null
          card_id?: string | null
          plan_id?: string | null
          subscription_id?: string | null
        }
      }
      profile_history: {
        Row: {
          id: string
          description: string | null
          visibility: number | null
          extra: Json | null
          created_at: string | null
          code: number | null
          profile_id: string | null
        }
        Insert: {
          id?: string
          description?: string | null
          visibility?: number | null
          extra?: Json | null
          created_at?: string | null
          code?: number | null
          profile_id?: string | null
        }
        Update: {
          id?: string
          description?: string | null
          visibility?: number | null
          extra?: Json | null
          created_at?: string | null
          code?: number | null
          profile_id?: string | null
        }
      }
      team: {
        Row: {
          id: string
          title: string
          owner_id: string
          created_at: string | null
          products: string[]
        }
        Insert: {
          id?: string
          title: string
          owner_id: string
          created_at?: string | null
          products?: string[]
        }
        Update: {
          id?: string
          title?: string
          owner_id?: string
          created_at?: string | null
          products?: string[]
        }
      }
      team_member: {
        Row: {
          id: string
          team_id: string
          profile_id: string
          created_at: string | null
        }
        Insert: {
          id?: string
          team_id: string
          profile_id: string
          created_at?: string | null
        }
        Update: {
          id?: string
          team_id?: string
          profile_id?: string
          created_at?: string | null
        }
      }
      team_member_client: {
        Row: {
          id: number
          profile_id: string
          team_member_id: string
          role: string
          created_at: string | null
        }
        Insert: {
          id?: number
          profile_id: string
          team_member_id: string
          role: string
          created_at?: string | null
        }
        Update: {
          id?: number
          profile_id?: string
          team_member_id?: string
          role?: string
          created_at?: string | null
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
